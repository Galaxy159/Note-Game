/////////////////////////////////////
// Drawing hamsha on canvas

const canvas = document.getElementById("layer1");

const hamshaHeight = 0.7 * canvas.height;
const c = canvas.getContext("2d");

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
    const clef_image = new Image();
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

////////////////////////////////////////////
// Note elipse layer

const canvasNote = document.getElementById("layer2");
const noteCTX = canvasNote.getContext("2d");

canvasNote.width = window.innerWidth;
canvasNote.height = 0.5 * window.innerHeight;

// Ellipse function

const ellipse = function (height) {
  noteCTX.beginPath();
  noteCTX.ellipse(
    0.5 * canvas.width,
    noteHeightArray[height],
    hamshaHeight / 8,
    23,
    Math.PI / 2.5,
    0,
    2 * Math.PI
  );
  noteCTX.fill();
  noteCTX.closePath();
};

////////////////////////////////////////////
// feedback layer

const canvasFeedback = document.getElementById("layer3");
const feedbackCTX = canvasNote.getContext("2d");

canvasFeedback.width = window.innerWidth;
canvasFeedback.height = 0.5 * window.innerHeight;
