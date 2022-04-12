const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const range = document.querySelector('#isRange');
const colors = document.getElementsByClassName('color');
const mode = document.querySelector('#jsMode');
const save = document.querySelector('#jsSave');

let painting = false;
let filling = false;

const CANVAS_SIZE = 700;
const INITIAL_COLOR = 'black';

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (painting) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

function clickCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function changeStrokeSize(event) {
  ctx.lineWidth = event.target.value;
}

function changeColor(event) {
  const selectColor = event.target.style.backgroundColor;
  ctx.strokeStyle = selectColor;
  ctx.fillStyle = selectColor;
}

function changeMode() {
  if (filling) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}

function saveFile() {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'paintJs';
  link.click();
}

function handelCM() {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', clickCanvas);
  canvas.addEventListener('contextmenu', handelCM);
}

if (range) {
  range.addEventListener('change', changeStrokeSize);
}

if (mode) {
  mode.addEventListener('click', changeMode);
}

if (save) {
  save.addEventListener('click', saveFile);
}
if (colors) {
  Array.from(colors).forEach(function (item) {
    item.addEventListener('click', changeColor);
  });
}
