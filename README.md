# SOC301 chart interpretation & recall survey

| File | What it is |
|---|---|
| `survey-config.js` | **All questions, chart images, and the intro and closing text. This is the only file you need to edit.** |
| `index.html` | The survey engine. No edits needed. |
| `images/` | Chart images. The current ones are placeholders. |
| `Code.gs` | The Google Apps Script that writes responses to your Google Sheet. |

## Survey flow
1. **About you** (untimed): education, age, sex, ethnicity, how often they read charts
2. **Reading charts** (timed): the 4 formats, each with 2 questions. The format order is random for each person.
3. **Your experience** (untimed): an ease rating for each format, shown in the same order they were seen
4. **General knowledge** (timed): trivia. This is a filler task between seeing the charts and recalling them.
5. **From memory** (timed): the same 8 chart questions in random order, with answer positions shuffled and no images
6. **Last questions** (untimed): which style they remembered best, and why

Every item records its time. Untimed items are marked `timed = 0` so you can leave them out of the analysis.

## Editing questions
Open `survey-config.js` in any text editor. Each question looks like this:
```js
{ id: "t1", prompt: "Which class year reported the least sleep?",
  options: ["Freshmen", "Sophomores", "Juniors", "Seniors"], correct: "Seniors" },
```
- `id` becomes part of the column name in the Sheet. Keep it short, with no spaces, and unique.
- `correct` must match one of the options **exactly**.
- The recall section copies the chart questions automatically, so each one is written only once.
- To add or remove a chart format, add or remove a block under `charts` (an `id`, `label`, `image`, and its `questions`). The experience and closing sections update on their own.
- Change `version` whenever you edit questions. It's saved with every response, so you can tell old data from new.

### Trivia
- Add, remove, or edit items in the `trivia` section just like any other question.
- `showAnswers: true` on a section shows Correct or "Not quite. The answer is …" after each answer, then a Continue button.
  The response time is recorded **before** the answer is revealed, so reading the feedback doesn't count toward it.
  Set it to `false` to turn this off. It works on any section, but leave it off for the chart and recall sections.
- `explanation: "..."` on an item adds a sentence after the answer, when answers are shown.

## Replacing the chart images
Put your images in `images/` (PNG, JPG, or SVG all work), then update the `image:` paths in the config. Each chart has to be readable at about 650 px wide, which is roughly the width of a laptop screen at this layout. Keep each file under about 500 KB so it loads instantly.

## Connecting the Google Sheet
1. Open your Sheet and go to **Extensions → Apps Script**. Replace the old code with everything in `Code.gs` and save.
2. Go to **Deploy → Manage deployments**, click the pencil icon, set **Version: New version**, and click **Deploy**.
   If you skip the new version, Google keeps running the old code. The URL stays the same, so `scriptUrl` in the config doesn't change.
3. Open the `/exec` URL in a browser. It should say `OK: survey endpoint is running.`
4. Responses go to a new tab called **Responses**. Columns are added automatically.

### Columns in the Sheet
- **One row per participant.** If someone leaves partway through, a row with `status = partial` is saved. Completed ones say `complete`.
- `formatOrder`: the order that person saw the charts, e.g. `comic > traditional > sketch > storytelling`
- `score__interp__comic`, `score__recall__comic`, …: number correct (0–2) for each format, during viewing and from memory. `score__trivia` is the trivia total.
- For each question, e.g. `recall__t1__...`:
  - `answer`
  - `correct` (1/0)
  - `ms_total`: milliseconds from when the question appeared to when Next was clicked
  - `ms_first`: milliseconds until their first click on an answer
  - `changes`: how many times they switched answers
  - `hidden_ms` / `blur_count`: time spent in another tab or window, a flag for distracted participants
  - `format`, `format_position`, `recall_position`, `options_shown`: what they saw and in what order
- `hiddenMsTotal`, `totalMs`, `device`, `screen`: useful for screening out low-quality responses
- `payload_json`: the raw data, as a backup

## Hosting on GitHub Pages (free)
1. Create a free account at github.com, then create a **New repository** (Public), e.g. `soc301-survey`.
2. Choose **Add file → Upload files** and drag in `index.html`, `survey-config.js`, and the `images` folder. Click **Commit**.
3. Go to **Settings → Pages**, set Source to **Deploy from a branch**, Branch to `main` / `(root)`, and click **Save**.
4. After about a minute your survey is live at `https://<your-username>.github.io/soc301-survey/`.
   To change questions later, upload the new `survey-config.js` the same way.

Don't upload `Code.gs`. It belongs in Apps Script only.

## Testing before you launch
- Add `?debug` to the URL (e.g. `.../soc301-survey/?debug`), press F12, and open the Console. Each answer is printed with its timing.
- Do a full run, then check that a row appeared in the Sheet.
- Run it once on a phone.
- Delete your test rows before sharing the link.

## Things to decide
- **Disclosure:** the intro describes the study as "questions about you, about reading charts, and about general knowledge" and doesn't mention timing or recall, so participants won't rush or memorize. The closing screen explains both. Check whether your instructor or IRB requires anything more.
- **Same data in every format:** because every chart shows the same numbers, later charts get easier. The random format order spreads this effect evenly across formats, and `format_position` lets you measure it.
- **Contact email:** set `contact` in the config.
