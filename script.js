"use-strict";
let scorePercentage,
  randomNote,
  nameCorrect,
  rangeFrom = 1,
  rangeTo = 21,
  scoreCorrect = 0,
  totalAnswers = 0;

const feedbackDOM = document.querySelector(".feedback");
const correctSound = new Audio("correct.mp3");
const incorrectSound = new Audio("incorrect.mp3");
const names = document.querySelectorAll(".note-names__note");
const randomNoteBtn = document.querySelector(".btn");

/////////////////////////////////////
// Drawing hamsha on canvas

const canvas = document.querySelector("canvas");

const hamshaHeight = 0.7 * canvas.height;

c = canvas.getContext("2d");

console.log(canvas.height);
canvas.width = window.innerWidth;
console.log(canvas.width);
canvas.height = 0.5 * window.innerHeight;

const drawHamsha = function () {
  c.beginPath();
  c.lineWidth = 1;
  c.strokeStyle = "black";
  c.strokeRect(
    0,
    0.5 * canvas.height - 0.5 * hamshaHeight,
    canvas.width,
    hamshaHeight
  );

  c.strokeRect(
    0,
    0.5 * canvas.height - 0.25 * hamshaHeight,
    canvas.width,
    0.5 * hamshaHeight
  );

  c.moveTo(0, 0.5 * canvas.height);
  c.lineTo(canvas.width, 0.5 * canvas.height);
  c.stroke();

  make_base();
  c.closePath();

  function make_base() {
    base_image = new Image();
    base_image.src = "img/g-clef.png";
    base_image.onload = function () {
      c.drawImage(
        base_image,
        -20,
        0.45 * hamshaHeight,
        160,
        0.72 * canvas.height
      );
    };
  }
};

drawHamsha();

/////////////////////////////////////////////////
// CREATING NOTE HEIGHT ARRAY AND UI

// Ellipse function

const ellipse = function (height) {
  c.beginPath();
  c.ellipse(
    0.6 * canvas.width,
    noteHeightArray[height],
    hamshaHeight / 8,
    23,
    Math.PI / 2.5,
    0,
    2 * Math.PI
  );
  c.fill();
  c.closePath();
};

// Kav ezer function:

const kavEzer = function (kavEzerHeight) {
  c.beginPath();
  c.lineWidth = 2;
  c.moveTo(0.5 * canvas.width, kavEzerHeight);
  c.lineTo(0.7 * canvas.width, kavEzerHeight);
  c.stroke();
  c.closePath();
};

// Note Class:

const middleNoteHeight = 0.5 * canvas.height;
const noteHeightArray = [];
const createNoteHeightArray = function () {
  let x = 11;
  for (let i = 0; i < 21; i++) {
    noteHeightArray.push(middleNoteHeight + (hamshaHeight / 8) * x);
    x--;
  }
};

createNoteHeightArray();
console.log(noteHeightArray);

function Note(height) {
  this.height = height;

  this.drawNote = function () {
    ellipse(this.height);

    if (this.height === 5) {
      kavEzer(noteHeightArray[this.height]);
    } else if (this.height === 4) {
      kavEzer(noteHeightArray[this.height + 1]);
    } else if (this.height === 3) {
      kavEzer(noteHeightArray[this.height]);
      kavEzer(noteHeightArray[this.height + 2]);
    } else if (this.height === 2) {
      kavEzer(noteHeightArray[this.height + 1]);
      kavEzer(noteHeightArray[this.height + 3]);
    } else if (this.height === 1) {
      kavEzer(noteHeightArray[this.height]);
      kavEzer(noteHeightArray[this.height + 2]);
      kavEzer(noteHeightArray[this.height + 4]);
    } else if (this.height === 0) {
      kavEzer(noteHeightArray[this.height + 1]);
      kavEzer(noteHeightArray[this.height + 3]);
      kavEzer(noteHeightArray[this.height + 5]);
    } else if (this.height === 17) {
      kavEzer(noteHeightArray[this.height]);
    } else if (this.height === 18) {
      kavEzer(noteHeightArray[this.height - 1]);
    } else if (this.height === 19) {
      kavEzer(noteHeightArray[this.height]);
      kavEzer(noteHeightArray[this.height - 2]);
    } else if (this.height === 20) {
      kavEzer(noteHeightArray[this.height - 1]);
      kavEzer(noteHeightArray[this.height - 3]);
    }
  };
}

// Creating note array

const noteArray = [];

const createNoteArray = function () {
  for (let i = 0; i < 21; i++) {
    noteArray.push(new Note(i));
  }
};
createNoteArray();

console.log(noteArray);

noteArray[9].drawNote();

const rangeArr = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const randomNumArray = [];

const getRandomNumberBetween = function (min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  randomNumArray.push(rangeArr[randomNum]);
  if (
    randomNumArray[randomNumArray.length - 1] ===
    randomNumArray[randomNumArray.length - 2]
  ) {
    randomNumArray.pop();
    randomNote = getRandomNumberBetween(0, rangeArr.length - 1);
  } else {
    return (randomNote = randomNumArray[randomNumArray.length - 1] + 1);
  }
};

getRandomNumberBetween(0, rangeArr.length - 1);
console.log(randomNumArray, randomNote);

randomNoteBtn.addEventListener("click", function () {
  getRandomNumberBetween(0, 20);
  console.log(randomNumArray);
  c.clearRect(0, 0, canvas.width, canvas.height);
  drawHamsha();
  noteArray[randomNote - 1].drawNote();
});

//////////////////////////////////////////
///////////////////////////////////////////////////////
// Stats functions
const scorePerc = function () {
  scorePercentage = ((scoreCorrect / totalAnswers) * 100).toFixed(2);
};

const updateStats = function () {
  totalAnswers += 1;
  scorePerc();
  document.querySelector(".stats__tries").textContent =
    "מספר מהלכים: " + totalAnswers;
  document.querySelector(".stats__success-percentage").textContent =
    "אחוזי הצלחה: " + scorePercentage;
};

/////////////////////////////////////////////////////
// Feedback functions

const feedbackCorrect = function () {
  // feedbackDOM.src = "img/check.png";
  correctSound.play();

  // const cardCorrect = document.querySelector(`.card${randomNote % 7}`);
  // cardCorrect.classList.add("card-correct");
  // feedbackDOM.classList.add("animate-correct");
  // setTimeout(() => {
  //   cardCorrect.classList.remove("card-correct");
  //   feedbackDOM.classList.remove("animate-correct");
  //   feedbackDOM.src = "img/feedback-blank.png";
  // }, 500);
};

const feedbackWrong = function () {
  // feedbackDOM.src = "img/remove.png";
  incorrectSound.play();
  window.navigator.vibrate(500);

  // const cardMistake = document.querySelector(`.card${randomNote % 7}`);
  // cardMistake.classList.add("card-mistake");
  // feedbackDOM.classList.add("animate-wrong");
  // setTimeout(() => {
  //   cardMistake.classList.remove("card-mistake");
  //   feedbackDOM.classList.remove("animate-wrong");
  //   feedbackDOM.src = "img/feedback-blank.png";
  // }, 500);
};

////////////////////////////////////////////////////
// Check match functions
const correctAnswer = function () {
  scoreCorrect += 1;
  feedbackCorrect();
};

const wrongAnswer = function () {
  feedbackWrong();
};

let lockCard = false;

const isMatch = function () {
  if (lockCard) {
    return;
  } else if (rangeArr.length < 2) {
    window.alert("בחר תווים נוספים כדי לשחק");
  } else {
    lockCard = true;
    parseInt(this.dataset.name) % 7 === randomNote % 7
      ? correctAnswer()
      : wrongAnswer();
    setTimeout(() => {
      updateStats();
      getRandomNumberBetween(0, rangeArr.length - 1);
      c.clearRect(0, 0, canvas.width, canvas.height);
      drawHamsha();
      noteArray[randomNote - 1].drawNote();

      lockCard = false;
    }, 500);
  }
};

///////////////////////////////////////////////////
// Handlers

names.forEach((name) => name.addEventListener("click", isMatch));
