/*
 * @name No Loop
 * @arialabel 黒背景の中央を白の水平線が横切る
 * @description noLoop()関数を用いるとdraw()関数を一度のみ実行することができます。
 * noLoop()関数を呼ばなければ、draw()関数内のコードは繰り返し実行されます。
 */
let y;

// setup() 関数内のステートメントは
// プログラム開始時に一度だけ実行される
function setup() {
  // createCanvas ステートメントはなるべく最初に記述
  createCanvas(720, 400);
  stroke(255); // 線の色を白に設定
  noLoop();

  y = height * 0.5;
}

// draw()関数内のステートメントは
// プログラムが停止するまで実行される。
// プログラムの最後の行が読み込まれた後、各ステートメントが連続して実行され、
// そして最初の行が再度実行される
function draw() {
  background(0); // 背景色を黒に設定
  y = y - 1;
  if (y < 0) {
    y = height;
  }
  line(0, y, width, y);
}
