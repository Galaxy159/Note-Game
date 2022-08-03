"use-strict";
import {
  param,
  dropdownContentBtn,
  dropdownLanguageBtn,
  languageDropdownContent,
  successRateDOM,
  triesDOM,
  btnRestart,
} from "./script.js";

//////////////////////////////////////////////////////////////
// language change

export const languageSettings = function () {
  const notesHE = ["רה", "פה", "לה", "דו", "מי", "סול", "סי"];
  const notesEnCDE = ["D", "F", "A", "C", "E", "G", "B"];
  const notesEnDOREMI = ["Re", "Fa", "La", "Do", "Mi", "Sol", "Si"];
  const rangeHeader = document.querySelector(".rangeHeader");
  const timerSelectLabel = document.querySelector(".timer-select__label");
  const tunerLabel = document.querySelector(".tuner__label");
  const copyright = document.querySelector(".copyright__text");

  const changeNoteNames = function (noteNameArr) {
    const currentNamesArr = [...document.querySelectorAll(".note-names__note")];
    let i = 0;
    currentNamesArr.forEach((div) => {
      div.innerHTML = `<span>${noteNameArr[i]}</span>`;
      i++;
    });
  };

  const englishSettings = function () {
    document.dir = "ltr";
    document.documentElement.setAttribute("lang", "en");
    document.title = "Identify the note";
    dropdownContentBtn.style.gridColumn = "2 / 3";
    dropdownLanguageBtn.style.gridColumn = "1 / 2";
    languageDropdownContent.classList.remove("language__dropdown--content--he");
    successRateDOM.innerText = "Success rate: ";
    triesDOM.innerText = "Tries: ";
    rangeHeader.innerText = "Choose notes to practice:";
    timerSelectLabel.innerText = "Time limit:";
    btnRestart.innerText = "Start a new game";
    tunerLabel.innerText = "Play mode:";
    copyright.innerHTML =
      "&copy; Copyright 2022 by Asaf Braun. All rights reserved";
  };

  const hebrewSettings = function () {
    document.dir = "rtl";
    languageDropdownContent.classList.add("language__dropdown--content--he");
    document.title = "זהה את התו";
    document.documentElement.setAttribute("lang", "he");
    dropdownContentBtn.style.gridColumn = "1 / 2";
    dropdownLanguageBtn.style.gridColumn = "2 / 3";
    successRateDOM.innerText = "אחוזי הצלחה: ";
    triesDOM.innerText = "מספר מהלכים: ";
    changeNoteNames(notesHE);
    rangeHeader.innerText = "בחר/י תווים לתרגול:";
    timerSelectLabel.innerText = "הגבלת זמן:";
    btnRestart.innerText = "התחל משחק חדש";
    tunerLabel.innerText = "מצב נגינה:";
    copyright.innerHTML =
      "Copyright 2022 by Asaf Braun. All rights reserved &copy;";
  };

  switch (param) {
    case "en-cde":
      englishSettings();
      changeNoteNames(notesEnCDE);
      break;
    case "en-doremi":
      englishSettings();
      changeNoteNames(notesEnDOREMI);
      break;
    case "he":
      hebrewSettings();
      break;
    default:
      hebrewSettings();
      break;
  }
};
