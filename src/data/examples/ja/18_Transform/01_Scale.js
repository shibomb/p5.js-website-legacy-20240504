/*
 * @name 拡大縮小
 * @arialabel 灰色の背景に、白と黒の二つの四角形が拡大縮小を繰り返しています。
 * @description scale() 関数のパラメーターは、少数付き倍率で指定された値です。
 * たとえば、scale(2.0) という関数呼び出しは、
 * 形状の寸法を 200％ 増加させます。
 * オブジェクトは常に原点から拡大縮小します。
 * この例では、変換がどのように累積されるか、
 * また、順序に応じて scale と translate がどのように相互作用するかを示しています。
 */

let a = 0.0;
let s = 0.0;

function setup() {
  createCanvas(720, 400);
  noStroke();
  // 全ての長方形を、デフォルトの左上隅ではなく
  // 中央から描画します。
  rectMode(CENTER);
}

function draw() {
  background(102);

  // 'a' を少しずつ増やし、
  // 余弦(コサイン)値からなる滑らかな周期的な動きで 's' をアニメーション化します。
  a = a + 0.04;
  s = cos(a) * 2;

  // 四角形を原点からキャンバスの中心に移動し、 
  // 's' で拡大縮小します。
  translate(width / 2, height / 2);
  scale(s);
  fill(51);
  rect(0, 0, 50, 50);

  // translate と scale が累積されるため、
  // ２つ目の四角形はひとつ目の四角形よりも、 
  // もっと右に移動させ、大きさも2倍にしています。
  // そして、余弦(コサイン)値は 's' をマイナスとプラスの両方になるため、
  // 左右に行ったり来たりします。
  translate(75, 0);
  fill(255);
  scale(s);
  rect(0, 0, 50, 50);
}
