/*
 * @name フォロー 2
 * @arialabel 2つの長い丸線が端でつながっています。ユーザーのマウスは丸線の一方の端に取り付けられており、マウスが動くと丸線が2つとも動きます。
 * @frame 710,400
 * @description 2分割されたアームがカーソルの位置を追います。アーム同士の相対的な
 * 角度は atan2() で計算し、位置は sin() および cos() で計算されます。
 * Keith Peters のコードを基にしています。
 */
let x = [0, 0],
  y = [0, 0],
  segLength = 50;

function setup() {
  createCanvas(710, 400);
  strokeWeight(20.0);
  stroke(255, 100);
}

function draw() {
  background(0);
  dragSegment(0, mouseX, mouseY);
  dragSegment(1, x[0], y[0]);
}

function dragSegment(i, xin, yin) {
  const dx = xin - x[i];
  const dy = yin - y[i];
  const angle = atan2(dy, dx);
  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;
  segment(x[i], y[i], angle);
}

function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}
