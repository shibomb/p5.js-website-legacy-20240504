/*
 * @name 変換
 * @arialabel 灰色の背景に、白い正方形と黒い正方形が横に移動しています。黒い正方形は白い正方形より速く移動しています。
 * @description translate() 関数は、オブジェクトをウィンドウ内の任意の位置に移動させることができます。
 * 1番目のパラメーターは x 軸のオフセットを設定し、
 * 2番目のパラメーターは y 軸のオフセットを設定します。
 * このサンプルでは、変換を累積していく方法を示しています。
 */

let x = 0;
let y = 0;
let dim = 80.0;

function setup() {
  createCanvas(720, 400);
  noStroke();
}

function draw() {
  background(102);
  // x の値を増やすことでアニメーションします。
  x = x + 0.8;
  // 形状がキャンバス外に出た場合は位置をリセットします。
  if (x > width + dim) {
    x = -dim;
  }

  // rect 関数が、原点を中心とした形状を描画していますが、
  // translate で
  // 新しい x 座標と y 座標に移動しています。
  translate(x, height / 2 - dim / 2);
  fill(255); 
  rect(-dim / 2, -dim / 2, dim, dim);

  // 変換を累積してます。
  // この四角形が移動する速度は、他の四角形の2倍です。
  // ですが、x 軸のパラメーターは同じであることに着目してください。
  translate(x, dim);
  fill(0);
  rect(-dim / 2, -dim / 2, dim, dim);
}
