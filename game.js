const question = document.getElementById("question");
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const game = document.getElementById("game");
const loader = document.getElementById("loader");

// Get choices and store them in array
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};

// client cannot answer before the site is loaded
let acceptingAnswers = false;

let score = 0;
let questionCounter = 0;

// Copy of full question set
let availableQuesions = [];

// Every question is an object => objects stored in array
let questions = [];

// CONSTANTS
const CORRECT_REWARD = 10;
const MAX_QUESTIONS = 5;

// fetch() = starts the process of fetching a resource from a server.
// Returns a Promise
// Promise will be in a http format
fetch("questions.json")
  .then((res) => {
    // Converting http into .json
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions;
    // Start game after questions are loaded
    startGame();
  })
  // In case of an error
  .catch((err) => {
    console.error(err);
  });

// START GAME
startGame = () => {
  // Reset again(just in case something goes wrong)
  questionCounter = 0;
  score = 0;

  // Copying qouestion to availableQuesions by using spread operator
  availableQuesions = [...questions];

  getNewQuestion();

  // Loader
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

// GET NEW QUESTION
getNewQuestion = () => {
  // End game
  if (availableQuesions === 0 || questionCounter >= MAX_QUESTIONS) {
    // Adding most recent score in local storage
    localStorage.setItem("recentScore", score);

    // Go to end game page
    return window.location.assign("end.html");
  }

  questionCounter++;

  // Display question counter
  questionCounterText.innerHTML = `${questionCounter}/${MAX_QUESTIONS}`;

  // Get a random question
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);

  // Adding current question
  currentQuestion = availableQuesions[questionIndex];

  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    // Getting the number from dataset property
    const number = choice.dataset["number"];

    // Getting the choice property and the data attribute assigned to it
    choice.innerText = currentQuestion["choice" + number];
  });

  // Remove displayed question
  // array.splice(index, howmany, item1, ....., itemX)
  availableQuesions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

// CHOICES
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    // IF we are not accepting answers then return/ ignor the fact that they clicked
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // If answer is correct then add correct class, else apply incorrect class
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_REWARD);
    }

    // Getting the parent element if selectedChoice(.options)
    // Adding classTOApply
    selectedChoice.parentElement.classList.add(classToApply);

    // Wait for 1000ms before removing the class and getting a new question
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
