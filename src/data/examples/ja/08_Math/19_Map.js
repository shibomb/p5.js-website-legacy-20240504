/*
 * @name マッピング
 * @arialabel 赤い円は、マウスが画面上で右に動くと大きくなり、黄色に変わります。
 * @description map() 関数を使用して、どのような数値でも新たな有効な数値にスケーリングし、
 * プロジェクトに必要な数値に変換します。
 * 例えば、マウスの位置からの数値を使用して形状のサイズや色を制御します。
 * この例では、マウスの x 座標（0 から 360 までの数値）が新たな数値にスケールされ、
 * 円の色やサイズを定義します。
 */
function setup() {
  createCanvas(720, 400);
  noStroke();
}

function draw() {
  background(0);
  // mouseX の値である 0 から 720 の範囲を、 0 から 175 の範囲にスケールします。
  let c = map(mouseX, 0, width, 0, 175);
  // mouseX の値である 0 から 720 の範囲を、 40 から 300 の範囲にスケールします。
  let d = map(mouseX, 0, width, 40, 300);
  fill(255, c, 0);
  ellipse(width/2, height/2, d, d);
}
