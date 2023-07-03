/*
 * @name 加速度と色
 * @description デバイスが回転したことを検出するには deviceMoved() を使用します。背景のRGBカラー値は、加速度X、加速度Y、加速度Zの値にマッピングされます。
 */

let r, g, b;

function setup() {
  createCanvas(displayWidth, displayHeight);
  r = random(50, 255);
  g = random(0, 200);
  b = random(50, 255);
}

function draw() {
  background(r, g, b);
  console.log('draw');
}

function deviceMoved() {
  r = map(accelerationX, -90, 90, 100, 175);
  g = map(accelerationY, -90, 90, 100, 200);
  b = map(accelerationZ, -90, 90, 100, 200);
}
