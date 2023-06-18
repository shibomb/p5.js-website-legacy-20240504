/*
 * @name 真と偽
 * @arialabel 黒い背景に左半分に複数の縦の白線、右半分に複数に横の白線があります。
 * @description ブール変数は、 true か false の2つの値のみが使用できます。
 * プログラムの流れを決定する制御文にブール値を使うのが一般的です。
 * このサンプルでは、ブール値 "b" が真のときは縦線が、偽のときは横線が引かれます。
 */
function setup() {
  createCanvas(720, 400);
  background(0);
  stroke(255);

  let b = false;
  let d = 20;
  let middle = width / 2;

  for (let i = d; i <= width; i += d) {
    b = i < middle;

    if (b === true) {
      // 縦線
      line(i, d, i, height - d);
    }

    if (b === false) {
      // 横線
      line(middle, i - middle + d, width - d, i - middle + d);
    }
  }
}
