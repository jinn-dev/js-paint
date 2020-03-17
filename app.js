const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#000000";
const CANVAS_SIZE = 700;

//pixel modifier
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//캔버스 바탕화면을 하얀색으로 고정하기 위해
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

//override하고 변경해야 함
ctx.strokeStyle = INITIAL_COLOR;
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
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault(); //Contextmenu 이벤트 막아서 우클릭 방지

}

function handleSaveClick(event) {
  //cavas의 image를 데이터로 변경해야 함
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
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
  canvas.addEventListener("contextmenu", handleCM);
}

if(range) {
  range.addEventListener("input", handleRange);
}

if(mode) {
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
