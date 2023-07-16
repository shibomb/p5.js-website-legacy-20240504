/*
 * @name 色相
 * @arialabel 画面をマウスでドラッグすると、バーの色がグラデーションで表示されます。
 * @description 色相は、物体から反射または透過する色であり、通常は色の名前（赤、青、
 * 黄色など）で言及されます。
 * 各バー上でカーソルを縦に移動させて、その色相を変更します。
 */
const barWidth = 20;
let lastBar = -1;

function setup() {
  createCanvas(720, 400);
  colorMode(HSB, height, height, height);
  noStroke();
  background(0);
}

function draw() {
  let whichBar = mouseX / barWidth;
  if (whichBar !== lastBar) {
    let barX = whichBar * barWidth;
    fill(mouseY, height, height);
    rect(barX, 0, barWidth, height);
    lastBar = whichBar;
  }
}
