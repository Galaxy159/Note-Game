"use-strict";

let scorePercentage,
  randomNote,
  scoreCorrect = 0,
  totalAnswers = 0;

////////////////////////////////////////////////////////
// EXPORTS

export const rangeArr = [9, 10, 11];
export const param = getParameterByName("p");
export const btnRestart = document.querySelector(".btn-restart");
export const dropdownContentBtn = document.querySelector(
  ".settings__dropdown--btn"
);
export const dropdownLanguageBtn = document.querySelector(
  ".language__dropdown--btn"
);
export const languageDropdownContent = document.querySelector(
  ".language__dropdown--content"
);
export const successRateDOM = document.querySelector(
  ".stats__success-percentage"
);
export const triesDOM = document.querySelector(".stats__tries");

////////////////////////////////////////////////////////////////
// VARIABLES

const incorrectSound = new Audio("../mp3/incorrect.mp3");
const correctSound = new Audio("../mp3/correct.mp3");
const names = document.querySelectorAll(".note-names__note");
const timerSelect = document.querySelector(".timer-select");
const timer = document.querySelector(".timer");
const dropdownContentID = document.getElementById("settingsDropdown");
const languageContentID = document.getElementById("languageDropdown");
const notesFrequency = [
  82, 87, 98, 110, 123, 131, 147, 165, 175, 196, 220, 247, 262, 294, 330, 349,
  392, 440, 494, 523, 587,
];

////////////////////////////////////////////////////////////
// IMPORTS

import { languageSettings } from "./language-settings.js";
import { pianoNotesArr } from "./piano-mp3.js";
languageSettings();

///////////////////////////////////////////////////////
// sound volume
incorrectSound.volume = 0.4;
correctSound.volume = 0.4;

/////////////////////////////////////////////////////
// Settings dropdown menu

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */

//Settings dropdown menu
const toggleSettingsMenu = function () {
  dropdownContentID.classList.toggle("show");
};
dropdownContentBtn.addEventListener("click", () => {
  toggleSettingsMenu();
});

// Language dropdown menu
const toggleLanguageMenu = function () {
  languageContentID.classList.toggle("show");
};
dropdownLanguageBtn.addEventListener("click", () => {
  toggleLanguageMenu();
});

// Creating note array

const noteArray = [];

const createNoteArray = function () {
  for (let i = 0; i < 21; i++) {
    noteArray.push(new Note(i));
  }
};
createNoteArray();

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
  scorePercentage = ((scoreCorrect / totalAnswers) * 100).toFixed(1);
};

const updateStats = function () {
  totalAnswers += 1;
  scorePerc();

  const statsHe = function () {
    triesDOM.textContent = "מהלכים: " + totalAnswers;
    successRateDOM.textContent = `אחוזי הצלחה: % ${
      isNaN(scorePercentage) ? "" : scorePercentage
    }`;
  };

  const statsEn = function () {
    triesDOM.textContent = "Moves: " + totalAnswers;
    successRateDOM.textContent = `Success rate: ${
      isNaN(scorePercentage) ? "" : scorePercentage
    } %`;
  };
  switch (param) {
    case "en-cde":
      statsEn();
      break;
    case "en-doremi":
      statsEn();
      break;
    case "he":
      statsHe();
      break;
    default:
      statsHe();
      break;
  }
};

/////////////////////////////////////////////////////
// Feedback functions
const generateCorrectImg = function () {
  const correctImg = new Image();
  correctImg.src = "img/correct.png";
  correctImg.onload = function () {
    feedbackCTX.drawImage(
      correctImg,
      0.7 * canvas.width,
      0.04 * canvas.height,
      100,
      100
    );
  };
};

const generateWrongImg = function () {
  const wrongImg = new Image();
  wrongImg.src = "img/wrong.png";
  wrongImg.onload = function () {
    feedbackCTX.drawImage(
      wrongImg,
      0.7 * canvas.width,
      0.04 * canvas.height,
      100,
      100
    );
  };
};

const feedbackCorrect = function () {
  generateCorrectImg();
  pianoNotesArr[randomNote - 1].play();
  setTimeout(() => {
    pianoNotesArr[randomNumArray[randomNumArray.length - 2]].pause();
    pianoNotesArr[randomNumArray[randomNumArray.length - 2]].currentTime = 0;
  }, 500);
};

const feedbackCorrectPitch = function () {
  correctSound.play();
  generateCorrectImg();
  setTimeout(() => {}, 500);
};

const correctAnswerPitch = function () {
  feedbackCorrectPitch();
  scoreCorrect += 1;
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
  noteCTX.clearRect(0, 0, canvas.width, canvas.height);
  drawHamsha(c, canvas);
  noteArray[randomNote - 1].drawNote();
}

let lockCard = false;

const isMatch = function () {
  const alertHe = function () {
    window.alert("בחר/י תווים נוספים כדי לשחק");
  };
  const alertEn = function () {
    window.alert("Choose more notes to play");
  };

  if (lockCard) {
    return;
  } else if (rangeArr.length < 2) {
    switch (param) {
      case "en-cde":
        alertEn();
        break;
      case "en-doremi":
        alertEn();
        break;
      case "he":
        alertHe();
        break;
      default:
        alertHe();
    }
  } else {
    lockCard = true;
    parseInt(this.dataset.name) % 7 === randomNote % 7
      ? correctAnswer()
      : wrongAnswer();

    updateStats();
    randomizeNote();
    setTimeout(() => {
      feedbackCTX.clearRect(
        0.7 * canvas.width,
        0.04 * canvas.height,
        0.7 * canvas.width + 100,
        0.04 * canvas.height + 77
      );
      lockCard = false;
    }, 450);
  }
};

export const isMatchPitch = function (pitchValue) {
  const alertHe = function () {
    window.alert("בחר/י תווים נוספים כדי לשחק");
  };
  const alertEn = function () {
    window.alert("Choose more notes to play");
  };

  if (
    pitchValue > notesFrequency[randomNote - 1] - 3 &&
    pitchValue < notesFrequency[randomNote - 1] + 3
  ) {
    if (lockCard) {
      return;
    } else if (rangeArr.length < 2) {
      switch (param) {
        case "en-cde":
          alertEn();
          break;
        case "en-doremi":
          alertEn();
          break;
        case "he":
          alertHe();
          break;
        default:
          alertHe();
      }
    } else {
      lockCard = true;
      if (
        pitchValue > notesFrequency[randomNote - 1] - 3 &&
        pitchValue < notesFrequency[randomNote - 1] + 3
      ) {
        correctAnswerPitch();
      } else {
        wrongAnswer();
      }
      console.log(notesFrequency[randomNote - 1]);

      updateStats();
      randomizeNote();

      setTimeout(() => {
        feedbackCTX.clearRect(
          0.7 * canvas.width,
          0.04 * canvas.height,
          0.7 * canvas.width + 100,
          0.04 * canvas.height + 77
        );
        lockCard = false;
      }, 450);
    }
  } else {
    return;
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
  const alertEn = function () {
    window.alert(
      `Correct answers: ${scoreCorrect}` +
        "\n" +
        `Wrong answers: ${totalAnswers - scoreCorrect}` +
        "\n" +
        `Success rate: ${scorePercentage} %` +
        "\n" +
        `Good job!`
    );
  };
  const alertHe = function () {
    window.alert(
      `תשובות נכונות: ${scoreCorrect}` +
        "\n" +
        `תשובות שגויות: ${totalAnswers - scoreCorrect}` +
        "\n" +
        `אחוז הצלחה: ${scorePercentage} %` +
        "\n" +
        `כל הכבוד!`
    );
  };
  timerUI();
  gameInterval = setInterval(function () {
    if (timeLeft < 0) {
      clearInterval(gameInterval);
      switch (param) {
        case "en-cde":
          alertEn();
          break;
        case "en-doremi":
          alertEn();
          break;
        case "he":
          alertHe();
          break;
        default:
          alertHe();
      }

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
  if (timerSelect.value > 0) {
    init();
    toggleSettingsMenu();
    startTimer();
  } else {
    init();
    toggleSettingsMenu();
  }
});
