/*
 * SURVEY CONFIGURATION — this is the only file you need to edit.
 *
 * Sections run top to bottom. Each section has:
 *   id        short name, used in the Google Sheet column names (no spaces)
 *   timed     true  = a measured response-time item (interpretation, trivia, recall)
 *             false = demographics / opinions (time is still recorded, just flagged 0)
 *   title / description   shown on a "Part X" screen before the section (omit title to skip it)
 *   type      "items" (default), "charts", "perChartLikert", or "recall"
 *
 * Item types: "choice" (pick one), "multi" (pick any), "likert", "number", "text".
 * Add `correct: "<option text>"` to any choice item that has a right answer.
 * Each item `id` must be unique within its section.
 */
window.SURVEY = {
  version: "v2", // bump when you change questions; it is saved with every response
  debug: false, // true = print the data to the browser console (or add ?debug to the URL)
  title: "Data Visualization Research Questionnaire",
  scriptUrl:
    "https://script.google.com/macros/s/AKfycbzYLUnhDPc3MZhDg1kkILU3nwqSewAmpe1K0lh6QI7BnTdAgpjghYazrCEszYDW0gOFQg/exec",
  contact: "alvarade@stjohns.edu", // shown if a submission fails and on the closing screen

  intro: {
    heading: "Welcome",
    html: `
      <p>This study asks some questions about you, about reading charts, and about general knowledge.
      It takes about <strong>5–10 minutes</strong>.</p>
      <p>Please complete it in one sitting, somewhere you won't be interrupted, and answer at your natural pace.
      Once you move past a question you can't go back.</p>
      <p>On the next screen you'll review the consent terms.</p>`,
    startLabel: "Continue",
  },

  // Consent Terms screen, shown after the welcome screen. The box scrolls if the text is long.
  // Use <h2> for headings, <p> for paragraphs, <ul><li> for bullet lists. Replace the [brackets].
  // Delete this whole `consent` block to skip the screen.
  consent: {
    heading: "Consent Terms",
    agreeLabel: "I agree",
    declineLabel: "I do not agree",
    html: `
      <h2>Purpose of the study</h2>
      <p>You are invited to take part in a research study conducted by Eric Alvarado, a student in SOC 301 at
      St. John's University, under the supervision of Dr. Roberta Villalón,. The study looks at how people read and
      understand information presented in different visual styles.</p>

      <h2>What you will do</h2>
      <p>You will answer a few background questions, look at several images and answer questions about them,
      and answer some general-knowledge questions. The survey takes about 5–10 minutes.</p>

      <h2>Risks and benefits</h2>
      <p>There are no known risks beyond those of everyday computer use. There is no direct benefit to you,
      but your answers may help us understand how to communicate information more clearly.</p>

      <h2>Confidentiality</h2>
      <p>The survey does not ask for your name, email, or any other identifying information. Each response is
      given a random ID. Data will be stored in a password-protected account, used only for this class project,
      and reported only as group summaries.</p>

      <h2>Voluntary participation</h2>
      <ul>
        <li>Taking part is completely voluntary.</li>
        <li>You may skip the study by choosing "I do not agree" below.</li>
        <li>You may stop at any time by closing this tab. Answers given before you close the tab may be saved.</li>
      </ul>

      <h2>Eligibility</h2>
      <p>You must be 18 years of age or older to take part.</p>

      <h2>Contact</h2>
      <p>If you have questions about this study, contact Eric Alvarado at alvarade@stjohns.edu.</p>

      <p><strong>By selecting "I agree," you confirm that you are 18 or older, have read the information above,
      and agree to take part in this study.</strong></p>`,
    declinedHeading: "Survey ended",
    declinedHtml: `<p>You chose not to take part. No answers were recorded. You may close this tab.</p>`,
  },

  sections: [
    {
      id: "demo",
      timed: false,
      title: "About you",
      description: "A few background questions.",
      items: [
        {
          id: "education",
          type: "choice",
          prompt: "What is the highest level of education you have completed?",
          options: [
            "Some high school",
            "High school diploma or GED",
            "Some college",
            "Associate degree",
            "Bachelor's degree",
            "Master's degree",
            "Doctorate or professional degree",
            "Prefer not to say",
          ],
        },
        {
          id: "age",
          type: "number",
          prompt: "What is your age?",
          min: 18,
          max: 99,
        },
        {
          id: "sex",
          type: "choice",
          prompt: "What is your sex?",
          options: ["Female", "Male", "Intersex", "Prefer not to say"],
        },
        {
          id: "ethnicity",
          type: "multi",
          prompt:
            "Which of the following best describes you? (Select all that apply.)",
          options: [
            "American Indian or Alaska Native",
            "Asian",
            "Black or African American",
            "Hispanic or Latino",
            "Middle Eastern or North African",
            "Native Hawaiian or Pacific Islander",
            "White",
            "Prefer to self-describe",
            "Prefer not to say",
          ],
          otherOption: "Prefer to self-describe", // shows a text box when picked
          exclusive: ["Prefer not to say"], // picking this clears the others
        },
        {
          id: "viz_experience",
          type: "likert",
          prompt: "How often do you read charts, graphs, or infographics?",
          labels: ["Never", "Rarely", "Monthly", "Weekly", "Daily"],
        },
      ],
    },

    {
      id: "interp",
      timed: true,
      type: "charts",
      title: "Reading charts",
      description:
        "You'll see the same information shown in a few different styles. Look at each one and answer the questions below it.",
      randomizeOrder: true, // each participant sees the formats in a random order (saved as formatOrder)
      charts: [
        {
          id: "traditional",
          label: "Traditional chart",
          image: "images/traditional2.png",
          alt: "Bar chart of average nightly sleep by class year",
          questions: [
            {
              id: "t1",
              prompt: "Which class year reported the least sleep?",
              options: ["Freshmen", "Sophomores", "Juniors", "Seniors"],
              correct: "Seniors",
            },
            {
              id: "t2",
              prompt: "About how many hours per night did freshmen sleep?",
              options: ["6.1 hours", "6.5 hours", "7.2 hours", "8.0 hours"],
              correct: "7.2 hours",
            },
          ],
        },
        {
          id: "storytelling",
          label: "Data storytelling",
          image: "images/storytelling2.png",
          alt: "Annotated chart highlighting senior sleep",
          questions: [
            {
              id: "s1",
              prompt: "What happens to sleep as students move through college?",
              options: [
                "It increases each year",
                "It stays about the same",
                "It decreases each year",
                "It goes up and down",
              ],
              correct: "It decreases each year",
            },
            {
              id: "s2",
              prompt: "How far below the recommended amount were seniors?",
              options: [
                "About 30 minutes",
                "About 1 hour",
                "About 2 hours",
                "About 3 hours",
              ],
              correct: "About 2 hours",
            },
          ],
        },
        {
          id: "comic",
          label: "Data comic",
          image: "images/comic2.png",
          alt: "Four-panel comic about student sleep",
          questions: [
            {
              id: "c1",
              prompt:
                "Between which two class years was the change in sleep smallest?",
              options: [
                "Freshman to sophomore",
                "Sophomore to junior",
                "Junior to senior",
                "They were all the same",
              ],
              correct: "Freshman to sophomore",
            },
            {
              id: "c2",
              prompt: "Did any class year get the recommended amount of sleep?",
              options: [
                "Yes, freshmen",
                "Yes, freshmen and sophomores",
                "Yes, all of them",
                "No, none did",
              ],
              correct: "No, none did",
            },
          ],
        },
        {
          id: "sketch",
          label: "Visual thinking sketch",
          image: "images/sketch2.png",
          alt: "Hand-drawn sketch about student sleep",
          questions: [
            {
              id: "k1",
              prompt: "About how much less did seniors sleep than freshmen?",
              options: [
                "About 15 minutes",
                "About 1 hour",
                "About 2 hours",
                "About 3 hours",
              ],
              correct: "About 1 hour",
            },
            {
              id: "k2",
              prompt: "How many hours of sleep per night are recommended?",
              options: ["6 hours", "7 hours", "8 hours", "9 hours"],
              correct: "8 hours",
            },
          ],
        },
      ],
    },

    {
      id: "experience",
      timed: false,
      type: "perChartLikert", // one question per chart format, shown in the order the person saw them
      title: "Your experience",
      description: "How was it to read each style?",
      prompt: "How easy was the {format} to interpret?",
      labels: ["Very difficult", "Difficult", "Neutral", "Easy", "Very easy"],
    },

    {
      id: "trivia",
      timed: true,
      title: "General knowledge",
      description: "A few quick general-knowledge questions.",
      showAnswers: true, // after each answer, show right/wrong (response time is recorded before this)
      items: [
        {
          id: "titanic",
          type: "choice",
          prompt: "About what percentage of people aboard the Titanic died?",
          options: ["10%", "30%", "50%", "70%"],
          correct: "70%",
          explanation: "About 1,500 of the roughly 2,200 people aboard died.",
        }, // optional, shown with the answer
        {
          id: "planet",
          type: "choice",
          prompt: "Which planet is closest to the Sun?",
          options: ["Venus", "Mercury", "Mars", "Earth"],
          correct: "Mercury",
        },
        {
          id: "hexagon",
          type: "choice",
          prompt: "How many sides does a hexagon have?",
          options: ["5", "6", "7", "8"],
          correct: "6",
        },
        {
          id: "ww2",
          type: "choice",
          prompt: "In what year did World War II end?",
          options: ["1918", "1939", "1945", "1950"],
          correct: "1945",
        },
      ],
    },

    {
      id: "recall",
      timed: true,
      type: "recall", // repeats every "charts" question, without the image
      from: "interp",
      shuffleQuestions: true, // random question order
      shuffleAnswers: true, // random answer order (saved as options_shown)
      title: "From memory",
      description:
        "Now answer the chart questions again from memory. The charts will not be shown.",
    },

    {
      id: "closing",
      timed: false,
      title: "Last questions",
      items: [
        {
          id: "most_memorable",
          type: "choice",
          options: "fromCharts", // the chart styles, with thumbnails
          prompt: "Which style do you feel you remembered best?",
        },
        {
          id: "why",
          type: "text",
          optional: true,
          prompt: "What about that style made it stick? (Optional)",
        },
      ],
    },
  ],

  debrief: {
    heading: "Thank you",
    html: `
      <p>Your responses have been recorded. You may now close this tab.</p>
      <p><strong>About this study:</strong> we are comparing how well people interpret and later recall
      the same information when it is shown as a traditional chart, a data story, a data comic, or a hand-drawn sketch.
      The time you took on each question was recorded, and the "from memory" questions measured recall.
      We didn't mention this up front so it wouldn't change how you read the charts.</p>`,
  },
};
