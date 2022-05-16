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

/////////////////////////////////////
// Drawing hamsha on canvas

const canvas = document.querySelector(".canvas-game");

const hamshaHeight = 0.7 * canvas.height;
c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 0.5 * window.innerHeight;

const drawHamsha = function (c, canvas) {
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

  make_clef();
  c.closePath();

  function make_clef() {
    clef_image = new Image();
    clef_image.src = "img/g-clef.png";
    clef_image.onload = function () {
      c.drawImage(
        clef_image,
        -20,
        0.58 * hamshaHeight,
        100,
        0.65 * canvas.height
      );
    };
  }
};

drawHamsha(c, canvas);

/////////////////////////////////////////////////
// CREATING NOTE HEIGHT ARRAY AND UI

// Ellipse function

const ellipse = function (height) {
  c.beginPath();
  c.ellipse(
    0.5 * canvas.width,
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
  c.moveTo(0.4 * canvas.width, kavEzerHeight);
  c.lineTo(0.6 * canvas.width, kavEzerHeight);
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

//////////////////////////////////////////////////
// Canvas range settings

const canvasRange = document.querySelector(".canvas-range");
cRange = canvasRange.getContext("2d");
canvasRange.width = window.innerWidth;
canvasRange.height = 0.5 * window.innerHeight;

drawHamsha(cRange, canvasRange);

/////////////////////////////////////////////////////
// Settings dropdown menu

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */

const dropdownContentID = document.getElementById("myDropdown");
function dropdownBtn() {
  dropdownContentID.classList.toggle("show");
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
const generateCorrectImg = function () {
  correctImg = new Image();
  correctImg.src = "img/correct.png";
  correctImg.onload = function () {
    c.drawImage(correctImg, 0.7 * canvas.width, 0.04 * canvas.height, 100, 100);
  };
};

const generateWrongImg = function () {
  wrongImg = new Image();
  wrongImg.src = "img/wrong.png";
  wrongImg.onload = function () {
    c.drawImage(wrongImg, 0.7 * canvas.width, 0.04 * canvas.height, 100, 100);
  };
};

const feedbackCorrect = function () {
  correctSound.play();
  generateCorrectImg();
};

const feedbackWrong = function () {
  incorrectSound.play();
  window.navigator.vibrate(500);
  generateWrongImg();
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

const randomizeNote = function () {
  getRandomNumberBetween(0, rangeArr.length - 1);
  c.clearRect(0, 0, canvas.width, canvas.height);
  drawHamsha(c, canvas);
  noteArray[randomNote - 1].drawNote();
};
window.onload = function () {
  randomizeNote();
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
      randomizeNote();

      lockCard = false;
    }, 500);
  }
};

///////////////////////////////////////////////////
// Handlers

names.forEach((name) => name.addEventListener("click", isMatch));
