/*
 * @name ループ有効
 * @arialabel 黒い背景上を x 軸に平行な白い水平線が下から上に移動します。
 * @description noLoop() 関数が setup() 関数内で実行されていると、
 * draw() 関数内のコードは一度しか実行されません。
 * このサンプルでは、マウスでクリックすると loop() 関数が実行され、
 * draw() 関数が繰り返し実行されるようになります。
 */
let y = 0;

// setup() 関数内の文は
// プログラム開始時に一度だけ実行されます。
function setup() {
  createCanvas(720, 400); // サイズの文は必ず最初に書きます。
  stroke(255); // 線の色を白に設定します。
  frameRate(30);
  noLoop();
}

// draw() 関数内の文はプログラムが停止するまで実行されます。
// 各文はプログラムの最後の行が
// 読み込まれた後連続して実行され、
// その後最初の行が再度実行されます。
function draw() {
  background(0); // 背景色を黒に設定します。
  y = y - 1;
  if (y < 0) {
    y = height;
  }
  line(0, y, width, y);
}

function mousePressed() {
  loop();
}
