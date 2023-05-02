/*
 * @name 数字
 * @arialabel 画面の上半分に1本の白い垂直線、下半分にも1本の白い垂直線がある黒い背景です。両方の線は、画面左から右に移動します。上の垂直線の方が下の垂直線よりも速く移動します。
 * @frame 720,400
 * @description 数値は小数点を含めた形式と含めない形式のどちらでも書くことができます。
 * 整数（一般に int と呼ばれる）は小数点のない数値です。
 * float は浮動小数点数で、
 * つまり小数点を持つ数値です。
 */
let a = 0; // Number型のグローバル変数「a」を作成します。
let b = 0; // Number型のグローバル変数「b」を作成します。

function setup() {
  createCanvas(720, 400);
  stroke(255);
}

function draw() {
  background(0);

  a = a + 1; // 整数でaをインクリメントします。
  b = b + 0.2; // float型の数値をでbを増やします。
  line(a, 0, a, height / 2);
  line(b, height / 2, b, height);

  if (a > width) {
    a = 0;
  }
  if (b > width) {
    b = 0;
  }
}
