const username = document.getElementById("username");
const saveBtn = document.getElementById("saveBtn");
// Getting recent score from local storage
const recentScore = localStorage.getItem("recentScore");
const finalScore = document.getElementById("finalScore");

finalScore.innerText = recentScore;

username.addEventListener("keyup", () => {
  // If there is no username then kepp the saveBtn disabled
  saveBtn.disabled = !username;
});

saveHighScore = (e) => {
  // Disable default function of form
  e.preventDefault();
};
