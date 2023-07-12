/*
 * @name 回転
 * @arialabel 濃い灰色の背景に、白い正方形が回転しています。
 * @description 正方形をZ軸の周りに回転させます。
 * 期待通りの結果を得るには、
 * rotate 関数の angle パラメーターに 0 から PI*2（TWO_PI、およそ 6.28）までの値を指定します。
 * 角度の単位を「度(0-360)」で考えたい場合は、
 * radians() 関数を使って値を変換することができます。
 * 例えば、rotate(radians(90)) は、rotate(PI/2) と同じです。
 * この例では
 * 偶数秒ごとにジッターが回転に加わっています。
 * 奇数秒では、最後のジッター値によって決定される速度で時計回りおよび反時計回りに回転します。
 */

let angle = 0.0;
let jitter = 0.0;

function setup() {
  createCanvas(720, 400);
  noStroke();
  fill(255);
  // 中心から長方形を描画するため、
  // またその中心を回転軸として使用します。
  rectMode(CENTER);
}

function draw() {
  background(51);

  // 偶数秒ごと（0,2,4,6...）に
  // ジッターを回転に加えます。
  if (second() % 2 === 0) {
    jitter = random(-0.1, 0.1);
  }
  // 最新のジッターを使用して角度値を増加させます。
  angle = angle + jitter;
  // 動かさないときにスムーズな時計回りおよび反時計回りの動きを得るために余弦(コサイン)を使用します。
  let c = cos(angle);
  // 形状をキャンバスの中心へ移動します。
  translate(width / 2, height / 2);
  // 最終的な回転を適用します。
  rotate(c);
  rect(0, 0, 180, 180);
}
