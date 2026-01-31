let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = 0;

const statusText = document.getElementById("status");
const highScoreText = document.getElementById("highScore");
const btns = ["red", "yellow", "green", "purple"];

document.addEventListener("keypress", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => btn.classList.remove("userFlash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  statusText.innerText = `Level ${level}`;

  const randColor = btns[Math.floor(Math.random() * 4)];
  gameSeq.push(randColor);

  const randBtn = document.getElementById(randColor);
  setTimeout(() => btnFlash(randBtn), 500);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  document.body.classList.add("game-over");

  const score = level - 1;
  highScore = Math.max(highScore, score);
  highScoreText.innerText = highScore;

  statusText.innerHTML = `
    Game Over 😵 <br>
    Score: <b>${score}</b><br>
    Press any key to restart
  `;

  reset();
  setTimeout(() => document.body.classList.remove("game-over"), 400);
}

function btnPress() {
  if (!started) return;

  const btn = this;
  const color = btn.id;

  userSeq.push(color);
  userFlash(btn);
  checkAns(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach(btn =>
  btn.addEventListener("click", btnPress)
);

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
