"use-strict";
let scorePercentage,
  randomNote,
  nameCorrect,
  scoreCorrect = 0,
  totalAnswers = 0;

const feedbackDOM = document.querySelector(".feedback");
const correctSound = new Audio("correct.mp3");
const incorrectSound = new Audio("incorrect.mp3");
const names = document.querySelectorAll(".note-names__note");
const btnRestart = document.querySelector(".btn-restart");
const timerSelect = document.querySelector(".timer-select");
const timer = document.querySelector(".timer");

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
  c.moveTo(0.5 * canvas.width - 46, kavEzerHeight);
  c.lineTo(0.5 * canvas.width + 46, kavEzerHeight);
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
const hamshaHeightRange = 0.22 * canvasRange.height;
const noteSpacing = (canvasRange.width - 80) / 6;

const drawHamshaRange = function (c, canvas) {
  c.beginPath();
  c.lineWidth = 1;
  c.strokeStyle = "black";
  c.strokeRect(
    0,
    0.5 * canvas.height - 0.5 * hamshaHeightRange,
    canvas.width,
    hamshaHeightRange
  );

  c.strokeRect(
    0,
    0.5 * canvas.height - 0.25 * hamshaHeightRange,
    canvas.width,
    0.5 * hamshaHeightRange
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
        -10,
        1.4 * hamshaHeightRange,
        60,
        0.41 * canvas.height
      );
    };
  }
};

drawHamshaRange(cRange, canvasRange);

const rangeSelect = () => {
  const hamsha = () => {
    const kavEzer = (x, y, z) => {
      cRange.beginPath();
      cRange.lineWidth = 1;
      cRange.strokeStyle = "#888";
      cRange.moveTo(45 + x, y);
      cRange.lineTo(z, y);
      cRange.stroke();
      cRange.closePath();
    };

    // Kavei ezer below:
    kavEzer(0, canvasRange.height / 2 + (hamshaHeightRange / 8) * 10, 75);
    kavEzer(0, canvasRange.height / 2 + (hamshaHeightRange / 8) * 8, 75);
    kavEzer(0, canvasRange.height / 2 + (hamshaHeightRange / 8) * 6, 75);

    kavEzer(
      noteSpacing,
      canvasRange.height / 2 + (hamshaHeightRange / 8) * 10,
      75 + noteSpacing
    );
    kavEzer(
      noteSpacing,
      canvasRange.height / 2 + (hamshaHeightRange / 8) * 8,
      75 + noteSpacing
    );
    kavEzer(
      noteSpacing,
      canvasRange.height / 2 + (hamshaHeightRange / 8) * 6,
      75 + noteSpacing
    );

    kavEzer(
      noteSpacing * 2,
      canvasRange.height / 2 + (hamshaHeightRange / 8) * 8,
      noteSpacing * 2 + 75
    );
    kavEzer(
      noteSpacing * 2,
      canvasRange.height / 2 + (hamshaHeightRange / 8) * 6,
      noteSpacing * 2 + 75
    );

    kavEzer(
      noteSpacing * 3,
      canvasRange.height / 2 + (hamshaHeightRange / 8) * 8,
      noteSpacing * 3 + 75
    );
    kavEzer(
      noteSpacing * 3,
      canvasRange.height / 2 + (hamshaHeightRange / 8) * 6,
      noteSpacing * 3 + 75
    );

    kavEzer(
      noteSpacing * 4,
      canvasRange.height / 2 + (hamshaHeightRange / 8) * 6,
      noteSpacing * 4 + 75
    );

    kavEzer(
      noteSpacing * 5,
      canvasRange.height / 2 + (hamshaHeightRange / 8) * 6,
      noteSpacing * 5 + 75
    );

    // Kavei ezer above:

    kavEzer(
      noteSpacing * 3,
      canvasRange.height / 2 - (hamshaHeightRange / 8) * 6,
      noteSpacing * 3 + 75
    );

    kavEzer(
      noteSpacing * 4,
      canvasRange.height / 2 - (hamshaHeightRange / 8) * 6,
      noteSpacing * 4 + 75
    );

    kavEzer(
      noteSpacing * 5,
      canvasRange.height / 2 - (hamshaHeightRange / 8) * 6,
      noteSpacing * 5 + 75
    );
    kavEzer(
      noteSpacing * 5,
      canvasRange.height / 2 - (hamshaHeightRange / 8) * 8,
      noteSpacing * 5 + 75
    );

    kavEzer(
      noteSpacing * 6,
      canvasRange.height / 2 - (hamshaHeightRange / 8) * 6,
      noteSpacing * 6 + 75
    );
    kavEzer(
      noteSpacing * 6,
      canvasRange.height / 2 - (hamshaHeightRange / 8) * 8,
      noteSpacing * 6 + 75
    );
  };

  hamsha();

  cRange.beginPath();
  cRange.strokeStyle = "#000";
  class Circle {
    constructor(xpoint, ypoint, radius, color, value, clicked) {
      this.xpoint = xpoint;
      this.ypoint = ypoint;
      this.radius = radius;
      this.color = color;
      this.value = value;
      this.clicked = clicked;
    }
    draw(context) {
      context.beginPath();
      context.arc(this.xpoint, this.ypoint, this.radius, 0, Math.PI * 2, false);
      context.fillStyle = this.color;
      context.fill();
      context.lineWidth = 1;
      context.stroke();
      context.closePath();
    }

    changeColor(newColor) {
      this.color = newColor;
      this.draw(cRange);
    }

    clickCircle(xmouse, ymouse) {
      const distance = Math.sqrt(
        (xmouse - this.xpoint) ** 2 + (ymouse - this.ypoint) ** 2
      );

      if (distance < this.radius + 13.7 && !this.clicked) {
        this.changeColor("#33ff33");
        rangeArr.push(this.value);
        this.clicked = true;
      } else if (distance < this.radius + 13.7 && this.clicked) {
        this.changeColor("#000");
        rangeArr.splice(rangeArr.indexOf(this.value), 1);
        this.clicked = false;
      }
    }
  }

  let circlesArr;
  const makeCircles = (n) => {
    circlesArr = new Array(n);
    const startX = 60;
    let x = 0;
    let y = 0.5 * canvasRange.height + (hamshaHeightRange / 8) * 11;
    let z = 0;
    for (let i = 0; i < n; i++) {
      circlesArr[i] = new Circle(
        x + startX,
        y,
        hamshaHeightRange / 8,
        "#000",
        z,
        false
      );
      x === noteSpacing * 6 ? (x = 0) : (x += noteSpacing);
      y -= hamshaHeightRange / 8;
      z += 1;
    }
  };
  const defaultRange = () => {
    circlesArr[9].color = "#33ff33";
    circlesArr[10].color = "#33ff33";
    circlesArr[11].color = "#33ff33";
    circlesArr[9].clicked = true;
    circlesArr[10].clicked = true;
    circlesArr[11].clicked = true;
  };
  makeCircles(21);
  defaultRange();

  const drawCircles = () => {
    for (let i = 0; i < circlesArr.length; i++) {
      circlesArr[i].draw(cRange);
    }
  };
  drawCircles();

  canvasRange.addEventListener("click", (event) => {
    const rect = canvasRange.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    circlesArr.forEach((circle) => circle.clickCircle(x, y));
  });
};

rangeSelect();

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

const rangeArr = [9, 10, 11];

const randomNumArray = [];

const getRandomNumberBetween = function (min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  randomNumArray.push(rangeArr[randomNum]);
  if (
    randomNumArray[randomNumArray.length - 1] ===
    randomNumArray[randomNumArray.length - 2]
  ) {
    randomNumArray.pop();
    getRandomNumberBetween(0, rangeArr.length - 1);
  } else {
    return (randomNote = randomNumArray[randomNumArray.length - 1] + 1);
  }
};

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
  document.querySelector(
    ".stats__success-percentage"
  ).textContent = `אחוזי הצלחה: ${
    isNaN(scorePercentage) ? "" : scorePercentage
  }`;
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

function randomizeNote() {
  getRandomNumberBetween(0, rangeArr.length - 1);
  c.clearRect(0, 0, canvas.width, canvas.height);
  drawHamsha(c, canvas);
  noteArray[randomNote - 1].drawNote();
}

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

    updateStats();
    setTimeout(() => {
      randomizeNote();
      lockCard = false;
    }, 500);
  }
};

//////////////////////////////////////////////////
// TIMER
let timeLeft = 0;
let gameInterval;

const timerUI = function () {
  timer.textContent =
    (timeLeft >= 60 ? "0" + parseInt(timeLeft / 60) : "00").toString() +
    ":" +
    (timeLeft % 60 >= 10 ? timeLeft % 60 : "0" + (timeLeft % 60)).toString();
  timeLeft -= 1;
};

const gameTimer = function () {
  timerUI();
  gameInterval = setInterval(function () {
    if (timeLeft < 0) {
      clearInterval(gameInterval);
      window.alert(
        `מזל טוב!` +
          "\n" +
          `תשובות נכונות: ${scoreCorrect}` +
          "\n" +
          `תשובות שגויות: ${totalAnswers - scoreCorrect}` +
          "\n" +
          `אחוז הצלחה: ${scorePercentage}`
      );
      init();
    }
    timerUI();
  }, 1000);
};

const startTimer = function () {
  clearInterval(gameInterval);
  timeLeft = timerSelect.value * 60;
  gameTimer();
};

//////////////////////////////////////////////////
// init function
const init = function () {
  scoreCorrect = 0;
  totalAnswers = -1;
  timeLeft = 0;
  randomizeNote();
  updateStats();
};
init();

///////////////////////////////////////////////////
// Handlers

names.forEach((name) => name.addEventListener("click", isMatch));

btnRestart.addEventListener("click", function () {
  init();
  dropdownBtn();
  startTimer();
});
