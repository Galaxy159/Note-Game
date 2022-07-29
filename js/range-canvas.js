"use-strict";
import { rangeArr } from "./script.js";
//////////////////////////////////////////////////
// Canvas range settings

const canvasRange = document.querySelector(".canvas-range");
const cRange = canvasRange.getContext("2d");
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
    const clef_image = new Image();
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
