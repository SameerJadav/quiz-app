const question = document.getElementById("question");
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

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
let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

// CONSTANTS
const CORRECT_REWARD = 10;
const MAX_QUESTIONS = 3;

// START GAME
startGame = () => {
  // Reset again(just in case something goes wrong)
  questionCounter = 0;
  score = 0;

  // Copying qouestion to availableQuesions by using spread operator
  availableQuesions = [...questions];

  getNewQuestion();
};

// GET NEW QUESTION
getNewQuestion = () => {
  // End game
  if (availableQuesions === 0 || questionCounter >= MAX_QUESTIONS) {
    // Adding most recent score in local storage
    localStorage.setItem("recentScore", score);

    // Go to end game page
    return window.location.assign("/end.html");
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

startGame();
