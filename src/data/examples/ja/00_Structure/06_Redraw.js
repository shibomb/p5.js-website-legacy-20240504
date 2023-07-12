/*
 * @name 再描画
 * @arialabel 黒い背景をクリックするたびに白の水平線が上に移動します。
 * @description redraw() 関数は draw() 関数を一度実行します。
 * この例では draw() 関数がマウスでクリックするたびに一度実行されます。
 */

let y;

// setup() 関数内の文は
// プログラム開始時に一度だけ実行されます。
function setup() {
  createCanvas(720, 400);
  stroke(255);
  noLoop();
  y = height * 0.5;
}

// draw() 関数内の文はプログラムが停止するまで実行されます。
// 各文はプログラムの最後の行が
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
