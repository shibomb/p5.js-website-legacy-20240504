/*
 * @name ループ停止
 * @arialabel 背景の中央を横切る白の水平線
 * @description noLoop()関数を用いるとdraw()関数を一度のみ実行することができます。
 * noLoop()関数を呼ばなければ、draw()関数内のコードは繰り返し実行されます。
 */
let y;

// setup()関数内のステートメントは
// プログラム開始時に一度だけ実行されます。
function setup() {
  // createCanvas ステートメントはなるべく最初に記述
  createCanvas(720, 400);
  stroke(255); // 線の色を白に設定
  noLoop();

  y = height * 0.5;
}

// draw()関数内のステートメントはプログラムが停止するまで実行されます。
// 各ステートメントはプログラムの最後の行が
// 読み込まれた後連続して実行され、
// その後最初の行が再度実行されます。
function draw() {
  background(0); // 背景色を黒に設定
  y = y - 1;
  if (y < 0) {
    y = height;
  }
  line(0, y, width, y);
}
