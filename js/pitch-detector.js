"use-strict";

import { isMatchPitch } from "./script.js";

//////////////////////////////////////////////////////////////////////////
// pitchDetector
let isInit = false;
const checkbox = document.querySelector("input[name=initCheckbox]");

const initPitch = function () {
  isInit = true;
  const audioContextPitch = new (window.AudioContext ||
    window.webkitAudioContext)();
  var source;
  var analyser = audioContextPitch.createAnalyser();
  analyser.minDecibels = -100;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;
  if (!navigator?.mediaDevices?.getUserMedia) {
    // No audio allowed
    alert("Sorry, getUserMedia is required for the app.");
    return;
  } else {
    var constraints = { audio: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        // Initialize the SourceNode
        source = audioContextPitch.createMediaStreamSource(stream);
        // Connect the source node to the analyzer
        source.connect(analyser);

        visualize();

        checkbox.addEventListener("change", (e) => {
          if (e.target.checked) {
            if (isInit) {
              stream.getAudioTracks()[0].enabled = true;
            }
          } else {
            if (isInit) {
              stream.getAudioTracks()[0].enabled = false;
            }
          }
        });
      })
      .catch(function (err) {
        alert("Sorry, microphone permissions are required for the app");
      });
  }

  // Visualizing, copied from voice change o matic

  function visualize() {
    const draw = function () {
      drawVisual = requestAnimationFrame(draw);
      analyser.fftSize = 2048;
      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);
    };

    let previousValueToDisplay = 0;
    let smoothingCount = 0;
    const smoothingThreshold = 5;
    const smoothingCountThreshold = 5;

    // Thanks to PitchDetect: https://github.com/cwilso/PitchDetect/blob/master/js/pitchdetect.js

    const drawNote = function () {
      requestAnimationFrame(drawNote);
      const bufferLength = analyser.fftSize;
      const buffer = new Float32Array(bufferLength);
      analyser.getFloatTimeDomainData(buffer);
      const autoCorrelateValue = autoCorrelate(
        buffer,
        audioContextPitch.sampleRate
      );

      // Handle rounding
      let valueToDisplay = autoCorrelateValue;

      valueToDisplay = Math.round(valueToDisplay);

      // Get the closest note
      // Thanks to PitchDetect:
      // valueToDisplay = noteStrings[noteFromPitch(autoCorrelateValue) % 12];

      isMatchPitch(autoCorrelateValue);

      function noteIsSimilarEnough() {
        // Check threshold for number, or just difference for notes.
        if (typeof valueToDisplay == "number") {
          return (
            Math.abs(valueToDisplay - previousValueToDisplay) <
            smoothingThreshold
          );
        } else {
          return valueToDisplay === previousValueToDisplay;
        }
      }
      // Check if this value has been within the given range for n iterations
      if (noteIsSimilarEnough()) {
        if (smoothingCount < smoothingCountThreshold) {
          smoothingCount++;
          return;
        } else {
          previousValueToDisplay = valueToDisplay;
          smoothingCount = 0;
        }
      } else {
        previousValueToDisplay = valueToDisplay;
        smoothingCount = 0;
        return;
      }
      if (typeof valueToDisplay == "number") {
        valueToDisplay += " Hz";
      }

      document.getElementById("note").innerText = valueToDisplay;
    };

    drawNote();
  }
};

checkbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    if (!isInit) {
      initPitch();
    }
  }
});

// Must be called on analyser.getFloatTimeDomainData and audioContextPitch.sampleRate
// From https://github.com/cwilso/PitchDetect/pull/23
function autoCorrelate(buffer, sampleRate) {
  // Perform a quick root-mean-square to see if we have enough signal
  let SIZE = buffer.length;
  let sumOfSquares = 0;
  for (var i = 0; i < SIZE; i++) {
    const val = buffer[i];
    sumOfSquares += val * val;
  }
  const rootMeanSquare = Math.sqrt(sumOfSquares / SIZE);
  if (rootMeanSquare < 0.01) {
    return -1;
  }

  // Find a range in the buffer where the values are below a given threshold.
  let r1 = 0;
  let r2 = SIZE - 1;
  const threshold = 0.2;

  // Walk up for r1
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < threshold) {
      r1 = i;
      break;
    }
  }

  // Walk down for r2
  for (var i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < threshold) {
      r2 = SIZE - i;
      break;
    }
  }

  // Trim the buffer to these ranges and update SIZE.
  buffer = buffer.slice(r1, r2);
  SIZE = buffer.length;

  // Create a new array of the sums of offsets to do the autocorrelation
  const c = new Array(SIZE).fill(0);
  // For each potential offset, calculate the sum of each buffer value times its offset value
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) {
      c[i] = c[i] + buffer[j] * buffer[j + i];
    }
  }

  // Find the last index where that value is greater than the next one (the dip)
  let d = 0;
  while (c[d] > c[d + 1]) {
    d++;
  }

  // Iterate from that index through the end and find the maximum sum
  let maxValue = -1;
  let maxIndex = -1;
  for (let i = d; i < SIZE; i++) {
    if (c[i] > maxValue) {
      maxValue = c[i];
      maxIndex = i;
    }
  }

  let T0 = maxIndex;

  // Not as sure about this part, don't @ me
  // From the original author:
  // interpolation is parabolic interpolation. It helps with precision. We suppose that a parabola pass through the
  // three points that comprise the peak. 'a' and 'b' are the unknowns from the linear equation system and b/(2a) is
  // the "error" in the abscissa. Well x1,x2,x3 should be y1,y2,y3 because they are the ordinates.
  const x1 = c[T0 - 1];
  const x2 = c[T0];
  const x3 = c[T0 + 1];

  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) {
    T0 = T0 - b / (2 * a);
  }

  return sampleRate / T0;
}
