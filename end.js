const username = document.getElementById("username");
const saveBtn = document.getElementById("saveBtn");
const finalScore = document.getElementById("finalScore");

// ***Local storage only stores key value pairs***
// ***Local storage will always accept strings***

// Getting recent score from local storage
const recentScore = localStorage.getItem("recentScore");

// Adding highScores in local storage
// JSON.parse = Converting string into array
// If we playing for the first time we don't have any data of high score then create an empty array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

finalScore.innerText = recentScore;

username.addEventListener("keyup", () => {
  // If there is no username then kepp the saveBtn disabled
  saveBtn.disabled = !username;
});

saveHighScore = (e) => {
  // Disable default function of form
  e.preventDefault();

  // This object will store score and username
  const score = {
    score: recentScore,
    name: username.value,
  };

  // Adding score to high score array
  highScores.push(score);

  // SORTING THE SCORE
  // If b.score is higher than a.score then put b before a
  highScores.sort((a, b) => b.score - a.score);

  // Only show 5 high scores
  highScores.splice(5);

  // Storing the high scores in local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};
