/* ==========================================================
   QUIZ MASTER - JAVASCRIPT LOGIC
   Beginner-Friendly, Clean, and Modular Code
   ========================================================== */

// ----------------------------------------------------------
// 1. QUIZ QUESTIONS DATA (General Knowledge - 10 Questions)
// ----------------------------------------------------------
const quizQuestions = [
  {
    category: "Science",
    question: "Which planet in our solar system is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1 // Mars (0-indexed)
  },
  {
    category: "Technology",
    question: "What does the web development acronym 'HTML' stand for?",
    options: [
      "HyperText Markup Language",
      "High Transfer Machine Language",
      "Hyperlink and Text Management Law",
      "Home Tool Management Language"
    ],
    correctAnswer: 0 // HyperText Markup Language
  },
  {
    category: "Geography",
    question: "Which is the longest river in the world?",
    options: ["Amazon River", "Yangtze River", "Nile River", "Mississippi River"],
    correctAnswer: 2 // Nile River
  },
  {
    category: "History",
    question: "In which year did the Apollo 11 mission successfully land humans on the Moon?",
    options: ["1965", "1969", "1972", "1975"],
    correctAnswer: 1 // 1969
  },
  {
    category: "General Knowledge",
    question: "What is the hardest naturally occurring mineral on Earth?",
    options: ["Gold", "Granite", "Quartz", "Diamond"],
    correctAnswer: 3 // Diamond
  },
  {
    category: "Science",
    question: "Which gas do green plants primarily absorb from the atmosphere during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: 2 // Carbon Dioxide
  },
  {
    category: "Technology",
    question: "Who is widely celebrated as the father of modern computer science and artificial intelligence?",
    options: ["Alan Turing", "Charles Babbage", "Ada Lovelace", "Nikola Tesla"],
    correctAnswer: 0 // Alan Turing
  },
  {
    category: "Geography",
    question: "Which country is famously known as the 'Land of the Rising Sun'?",
    options: ["China", "South Korea", "Thailand", "Japan"],
    correctAnswer: 3 // Japan
  },
  {
    category: "History",
    question: "Which famous Renaissance polymath and artist painted the 'Mona Lisa'?",
    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Vincent van Gogh"],
    correctAnswer: 1 // Leonardo da Vinci
  },
  {
    category: "General Knowledge",
    question: "How many continents are there on planet Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2 // 7
  }
];

// ----------------------------------------------------------
// 2. STATE VARIABLES
// ----------------------------------------------------------
let currentQuestionIndex = 0; // Tracks which question is active
let score = 0;                // Tracks number of correct answers
let hasAnswered = false;       // Prevents multiple answers per question

// ----------------------------------------------------------
// 3. DOM ELEMENT REFERENCES
// ----------------------------------------------------------
// Screens
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

// Buttons
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

// Quiz Elements
const questionCategoryEl = document.getElementById("question-category");
const questionCounterEl = document.getElementById("question-counter");
const progressFillEl = document.getElementById("progress-fill");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackBannerEl = document.getElementById("feedback-banner");
const feedbackIconEl = document.getElementById("feedback-icon");
const feedbackTextEl = document.getElementById("feedback-text");
const currentScoreTextEl = document.getElementById("current-score-text");

// Results Elements
const resultEmojiEl = document.getElementById("result-emoji");
const resultTitleEl = document.getElementById("result-title");
const resultSubtitleEl = document.getElementById("result-subtitle");
const finalPercentageEl = document.getElementById("final-percentage");
const finalScoreEl = document.getElementById("final-score");
const statCorrectEl = document.getElementById("stat-correct");
const statWrongEl = document.getElementById("stat-wrong");

// ----------------------------------------------------------
// 4. CORE FUNCTIONS
// ----------------------------------------------------------

/**
 * Starts the quiz from the beginning.
 */
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  // Show quiz screen, hide start & results
  startScreen.classList.add("hide");
  resultScreen.classList.add("hide");
  quizScreen.classList.remove("hide");

  // Load the first question
  loadQuestion();
}

/**
 * Loads and displays the current question and options.
 */
function loadQuestion() {
  hasAnswered = false;

  // Reset next button state
  nextBtn.disabled = true;
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  nextBtn.querySelector("span").textContent = isLastQuestion ? "Finish Quiz" : "Next Question";

  // Hide feedback banner
  feedbackBannerEl.classList.add("hide");
  feedbackBannerEl.className = "feedback-banner hide";

  // Get current question data
  const currentQ = quizQuestions[currentQuestionIndex];

  // Update header info
  questionCategoryEl.textContent = currentQ.category;
  questionCounterEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  currentScoreTextEl.textContent = score;

  // Update progress bar
  const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  progressFillEl.style.width = `${progressPercent}%`;

  // Set question text
  questionTextEl.textContent = currentQ.question;

  // Clear previous options
  optionsContainerEl.innerHTML = "";

  // Render 4 option buttons
  const optionLetters = ["A", "B", "C", "D"];
  currentQ.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.setAttribute("type", "button");
    button.setAttribute("data-index", index);

    button.innerHTML = `
      <span class="option-prefix">${optionLetters[index]}</span>
      <span class="option-text">${optionText}</span>
      <span class="option-status-icon"></span>
    `;

    // Click handler for selecting an option
    button.addEventListener("click", () => handleOptionClick(index, button));

    optionsContainerEl.appendChild(button);
  });
}

/**
 * Handles the user clicking an answer option.
 * @param {number} selectedIndex - The index of chosen option (0-3)
 * @param {HTMLElement} selectedBtn - The clicked button element
 */
function handleOptionClick(selectedIndex, selectedBtn) {
  // Guard against answering multiple times for the same question
  if (hasAnswered) return;
  hasAnswered = true;

  const currentQ = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedIndex === currentQ.correctAnswer;
  const allOptionButtons = optionsContainerEl.querySelectorAll(".option-btn");

  // Disable all option buttons so they cannot be re-clicked
  allOptionButtons.forEach(btn => btn.disabled = true);

  if (isCorrect) {
    // 1. Correct Answer Selected
    score++;
    currentScoreTextEl.textContent = score;

    selectedBtn.classList.add("correct");
    selectedBtn.querySelector(".option-status-icon").textContent = "✓";

    // Dim non-selected options
    allOptionButtons.forEach((btn, idx) => {
      if (idx !== selectedIndex) btn.classList.add("dimmed");
    });

    // Show success feedback
    showFeedback(true, "Correct! Great job!");
  } else {
    // 2. Incorrect Answer Selected
    selectedBtn.classList.add("incorrect");
    selectedBtn.querySelector(".option-status-icon").textContent = "✗";

    // Highlight the right answer so the user learns
    const correctBtn = allOptionButtons[currentQ.correctAnswer];
    if (correctBtn) {
      correctBtn.classList.add("correct");
      correctBtn.querySelector(".option-status-icon").textContent = "✓";
    }

    // Dim other wrong options
    allOptionButtons.forEach((btn, idx) => {
      if (idx !== selectedIndex && idx !== currentQ.correctAnswer) {
        btn.classList.add("dimmed");
      }
    });

    // Show error feedback with the correct option text
    const correctText = currentQ.options[currentQ.correctAnswer];
    showFeedback(false, `Incorrect! The correct answer is "${correctText}".`);
  }

  // Enable the Next button now that an answer has been given
  nextBtn.disabled = false;
  nextBtn.focus();
}

/**
 * Displays the feedback banner with icon and message.
 * @param {boolean} isCorrect - Whether the user answered correctly
 * @param {string} message - Feedback description
 */
function showFeedback(isCorrect, message) {
  feedbackBannerEl.classList.remove("hide");
  feedbackBannerEl.className = `feedback-banner ${isCorrect ? "correct" : "incorrect"}`;
  feedbackIconEl.textContent = isCorrect ? "✓" : "!";
  feedbackTextEl.textContent = message;
}

/**
 * Advances to the next question or finishes the quiz.
 */
function handleNextQuestion() {
  if (!hasAnswered) return;

  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

/**
 * Calculates final score and displays the results screen.
 */
function showResults() {
  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");

  const totalQuestions = quizQuestions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const wrongCount = totalQuestions - score;

  // Update Score stats
  finalPercentageEl.textContent = `${percentage}%`;
  finalScoreEl.textContent = `${score} / ${totalQuestions}`;
  statCorrectEl.textContent = score;
  statWrongEl.textContent = wrongCount;

  // Dynamic feedback and styling based on score percentage
  if (percentage === 100) {
    resultEmojiEl.textContent = "🏆";
    resultTitleEl.textContent = "Perfect Score!";
    resultSubtitleEl.textContent = "Incredible! You got every single question right. You are a true Quiz Master!";
  } else if (percentage >= 80) {
    resultEmojiEl.textContent = "🌟";
    resultTitleEl.textContent = "Outstanding!";
    resultSubtitleEl.textContent = "Excellent performance! Your general knowledge is top-notch.";
  } else if (percentage >= 60) {
    resultEmojiEl.textContent = "👍";
    resultTitleEl.textContent = "Well Done!";
    resultSubtitleEl.textContent = "Good effort! You passed with a solid understanding of general knowledge.";
  } else {
    resultEmojiEl.textContent = "💡";
    resultTitleEl.textContent = "Keep Practicing!";
    resultSubtitleEl.textContent = "Every attempt is a chance to learn something new. Try again to boost your score!";
  }
}

/**
 * Restarts the quiz cleanly.
 */
function restartQuiz() {
  startQuiz();
}

// ----------------------------------------------------------
// 5. EVENT LISTENERS
// ----------------------------------------------------------
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNextQuestion);
restartBtn.addEventListener("click", restartQuiz);
