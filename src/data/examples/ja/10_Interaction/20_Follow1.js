/*
 * @name フォロー 1
 * @arialabel 長い丸線につながった円があります。ユーザーのマウスは楕円の端に取り付けられています。マウスが動くと、楕円と円も一緒に動きます。
 * @frame 710,400
 * @description 丸線はカーソルによって押されたり引かれたりします。
 * Keith Peters のコードを基にしています。
 */
let x = 100,
  y = 100,
  angle1 = 0.0,
  segLength = 50;

function setup() {
  createCanvas(710, 400);
  strokeWeight(20.0);
  stroke(255, 100);
}

function draw() {
  background(0);

  dx = mouseX - x;
  dy = mouseY - y;
  angle1 = atan2(dy, dx);
  x = mouseX - cos(angle1) * segLength;
  y = mouseY - sin(angle1) * segLength;

  segment(x, y, angle1);
  ellipse(x, y, 20, 20);
}

function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}
