const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#000000";
const CANVAS_SIZE = 700;

//pixel modifier
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR; //override하고 변경해야 함
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) {

    //console.log("creating path in ", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);

  } else {
    //console.log("creating line in ", x, y);
    ctx.lineTo(x, y); //path의 이전위치에서 지금위치까지 선을 만든다.
    ctx.stroke();
    //ctx.closePath();
  }
}

function onMouseDown(event) {
  painting = true;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRange(event) {
  const value = event.target.value;
  ctx.lineWidth = value;
}

function handleModeClick(event) {
  if(filling === true) {
    filling = false;
    mode.innerText  = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(event) {
  if(filling) {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

Array.from(colors).forEach((color) => {
  color.addEventListener("click", handleColorClick);
});
 //Arrays.from: Object로부터 Array를 만들어준다.

if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("onMouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

if(range) {
  range.addEventListener("input", handleRange);
}

if(mode) {
  mode.addEventListener("click", handleModeClick);
}
