/*
 * @name Loop
 * @arialabel 黒背景の画面上を下から上に移動するx軸に平行な白い水平線
 * @description noLoop()関数がsetup()関数内で実行されていると、
 * draw()関数内のコードは一度しか実行されません。
 * このサンプルでは、マウスでクリックするとloop()関数が実行され、
 * draw()関数が繰り返し実行されるようになります。
 */
let y = 0;

// setup()関数内のステートメントは
// プログラム開始時に一度だけ実行されます。
function setup() {
  createCanvas(720, 400); // サイズのステートメントは必ず最初に書く
  stroke(255); // 線の色を白に設定
  frameRate(30);
  noLoop();
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

function mousePressed() {
  loop();
}
