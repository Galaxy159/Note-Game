"use-strict";

import { piano, organ } from "./wavetable.js";

////////////////////////////////////////////////////////
// Audio API
const notes = [
  { name: "E", frequency: 82 },
  { name: "F", frequency: 87 },
  { name: "G", frequency: 98 },
  { name: "A", frequency: 110 },
  { name: "B", frequency: 123 },
  { name: "C", frequency: 131 },
  { name: "D", frequency: 147 },
  { name: "E", frequency: 165 },
  { name: "F", frequency: 175 },
  { name: "G", frequency: 196 },
  { name: "A", frequency: 220 },
  { name: "B", frequency: 247 },
  { name: "C", frequency: 262 },
  { name: "D", frequency: 294 },
  { name: "E", frequency: 330 },
  { name: "F", frequency: 349 },
  { name: "G", frequency: 392 },
  { name: "A", frequency: 440 },
  { name: "B", frequency: 494 },
  { name: "C", frequency: 523 },
  { name: "D", frequency: 587 },
];

let audioContext;

export const playNote = function (randomNote) {
  audioContext = new AudioContext();
  const primaryGainControl = audioContext.createGain();
  primaryGainControl.gain.setValueAtTime(0.3, 0);
  primaryGainControl.connect(audioContext.destination);
  const wave = new PeriodicWave(audioContext, {
    real: piano.real,
    imag: piano.imag,
  });
  const frequency = notes[randomNote - 1].frequency;
  const noteOscillator = new OscillatorNode(audioContext, {
    frequency: frequency,
    type: "custome",
    periodicWave: wave,
  });

  noteOscillator.connect(primaryGainControl);
  noteOscillator.start();
  noteOscillator.stop(audioContext.currentTime + 0.3);
};
