/*
 * @name Redraw
 * @arialabel 黒背景の画面上をクリックするたびに上昇する白の水平線
 * @description redraw()関数はdraw()関数を一度実行します。
 * このサンプルではdraw()関数マウスでクリックするたびに一度実行されます。
 */

let y;

// setup()関数内のステートメントは
// プログラム開始時に一度だけ実行されます。
function setup() {
  createCanvas(720, 400);
  stroke(255);
  noLoop();
  y = height * 0.5;
}

// draw()関数内のステートメントはプログラムが止まるまで実行されます。
// 各ステートメントはプログラムの最後の行が
// 読み込まれた後連続して実行され、
// その後最初の行が再度実行されます。
function draw() {
  background(0);
  y = y - 4;
  if (y < 0) {
    y = height;
  }
  line(0, y, width, y);
}

function mousePressed() {
  redraw();
}
