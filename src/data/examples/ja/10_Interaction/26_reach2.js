/*
 * @name リーチ 2
 * @arialabel 灰色の三角形が分割され、黒いスクリーンの下部に取り付けられています。三角形の先端は、ユーザーのマウスの動きについてきます。
 * @frame 710,400
 * @description アームは atan2() を使って角度を計算することにより、マウスについてきます。
 * Keith Peters のコードを基にしています。
 */
let numSegments = 10,
  x = [],
  y = [],
  angle = [],
  segLength = 26,
  targetX,
  targetY;

for (let i = 0; i < numSegments; i++) {
  x[i] = 0;
  y[i] = 0;
  angle[i] = 0;
}

function setup() {
  createCanvas(710, 400);
  strokeWeight(20);
  stroke(255, 100);

  x[x.length - 1] = width / 2; // ベースの x 座標を設定します。
  y[x.length - 1] = height; // ベースの y 座標を設定します。
}

function draw() {
  background(0);

  reachSegment(0, mouseX, mouseY);
  for (let i = 1; i < numSegments; i++) {
    reachSegment(i, targetX, targetY);
  }
  for (let j = x.length - 1; j >= 1; j--) {
    positionSegment(j, j - 1);
  }
  for (let k = 0; k < x.length; k++) {
    segment(x[k], y[k], angle[k], (k + 1) * 2);
  }
}

function positionSegment(a, b) {
  x[b] = x[a] + cos(angle[a]) * segLength;
  y[b] = y[a] + sin(angle[a]) * segLength;
}

function reachSegment(i, xin, yin) {
  const dx = xin - x[i];
  const dy = yin - y[i];
  angle[i] = atan2(dy, dx);
  targetX = xin - cos(angle[i]) * segLength;
  targetY = yin - sin(angle[i]) * segLength;
}

function segment(x, y, a, sw) {
  strokeWeight(sw);
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}
