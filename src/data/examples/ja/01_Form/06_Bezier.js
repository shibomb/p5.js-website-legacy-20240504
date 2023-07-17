/*
 * @name ベジェ
 * @arialabel 10本の線がベジェ曲線で形成されています。曲線の下部は動かないですが、ユーザーのマウスが動くと、曲線の上部は左右の動きに追従します。
 * @description 最初の2つのパラメータは bezier() 関数に対して曲線の
 * 最初の点を指定し、最後の2つのパラメータは最後の点を指定します。
 * 中間のパラメータは、
 * 曲線の形状を定義する制御点を設定します。
 */
function setup() {
  createCanvas(720, 400);
  stroke(255);
  noFill();
}

function draw() {
  background(0);
  for (let i = 0; i < 200; i += 20) {
    bezier(
      mouseX - i / 2.0,
      40 + i,
      410,
      20,
      440,
      300,
      240 - i / 16.0,
      300 + i / 8.0
    );
  }
}
