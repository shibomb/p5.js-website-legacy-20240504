/*
 * @name 連続線
 * @arialabel ユーザーがマウスをドラッグすると、暗い灰色の背景に薄い白色の線が描かれます。
 * @description マウスをドラッグすると、線を描くことができます。
 */
function setup() {
  createCanvas(710, 400);
  background(102);
}

function draw() {
  stroke(255);
  if (mouseIsPressed === true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
