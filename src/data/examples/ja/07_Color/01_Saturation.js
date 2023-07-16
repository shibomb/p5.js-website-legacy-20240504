/*
 * @name 彩度
 * @arialabel 画面をマウスでドラッグすると、虹色のバーがグラデーションで表示されます。これらのバーの彩度は、ユーザーがマウスをドラッグするにつれて変化します。
 * @description 彩度は色の強さまたは純粋さを飽和度として表現し、
 * 色相に対する灰色の割合を表します。
 * "飽和"状態の色は純粋な色相の色であり、"非飽和"な状態は灰色が強くなっています。
 * 各バー上でカーソルを縦に移動して、その彩度を変更します。
 */
const barWidth = 20;
let lastBar = -1;

function setup() {
  createCanvas(720, 400);
  colorMode(HSB, width, height, 100);
  noStroke();
}

function draw() {
  let whichBar = mouseX / barWidth;
  if (whichBar !== lastBar) {
    let barX = whichBar * barWidth;
    fill(barX, mouseY, 66);
    rect(barX, 0, barWidth, height);
    lastBar = whichBar;
  }
}
