const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
//pixel modifier
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle ="#000000"; //override하고 변경해야 함
ctx.lineWidth = 2.5;

let painting = false;

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
}
