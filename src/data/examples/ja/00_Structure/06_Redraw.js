/*
 * @name 再描画
 * @arialabel 黒い背景の画面上をクリックするたびに上昇する白の水平線
 * @description redraw() 関数は draw() 関数を一度実行します。
 * このサンプルでは draw() 関数がマウスでクリックするたびに一度実行されます。
 */

let y;

// setup() 関数内のステートメントは
// プログラム開始時に一度だけ実行されます。
function setup() {
  createCanvas(720, 400);
  stroke(255);
  noLoop();
  y = height * 0.5;
}

// draw() 関数内のステートメントはプログラムが停止するまで実行されます。
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
