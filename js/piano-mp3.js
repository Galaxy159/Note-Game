"use-strict";

const e2 = new Audio("../mp3/freq/E2.mp3");
const f2 = new Audio("../mp3/freq/F2.mp3");
const g2 = new Audio("../mp3/freq/G2.mp3");
const a2 = new Audio("../mp3/freq/A2.mp3");
const b2 = new Audio("../mp3/freq/B2.mp3");
const c3 = new Audio("../mp3/freq/C3.mp3");
const d3 = new Audio("../mp3/freq/D3.mp3");
const e3 = new Audio("../mp3/freq/E3.mp3");
const f3 = new Audio("../mp3/freq/F3.mp3");
const g3 = new Audio("../mp3/freq/G3.mp3");
const a3 = new Audio("../mp3/freq/A3.mp3");
const b3 = new Audio("../mp3/freq/B3.mp3");
const c4 = new Audio("../mp3/freq/C4.mp3");
const d4 = new Audio("../mp3/freq/D4.mp3");
const e4 = new Audio("../mp3/freq/E4.mp3");
const f4 = new Audio("../mp3/freq/F4.mp3");
const g4 = new Audio("../mp3/freq/G4.mp3");
const a4 = new Audio("../mp3/freq/A4.mp3");
const b4 = new Audio("../mp3/freq/B4.mp3");
const c5 = new Audio("../mp3/freq/C5.mp3");
const d5 = new Audio("../mp3/freq/D5.mp3");

export const pianoNotesArr = [
  e2,
  f2,
  g2,
  a2,
  b2,
  c3,
  d3,
  e3,
  f3,
  g3,
  a3,
  b3,
  c4,
  d4,
  e4,
  f4,
  g4,
  a4,
  b4,
  c5,
  d5,
];

const audioCtx = new AudioContext();

for (let i = 0; i < pianoNotesArr.length; i++) {
  const source = audioCtx.createMediaElementSource(pianoNotesArr[i]);
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 3;
  source.connect(gainNode);

  gainNode.connect(audioCtx.destination);
}
