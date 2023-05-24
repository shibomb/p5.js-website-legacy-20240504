/*
 *@name 関数
 *@arialabel 黒い円の形をしたターゲットが3つ作成されています。円の中心から外縁にかけて、白から黒へのグラデーションがかかっています。
 *@description drawTarget() 関数を使用すると、
 *多くの異なるターゲットを簡単に描画することができます。drawTarget() を呼び出すたびに、
 *各ターゲットの位置、サイズ、リングの数が指定されます。
 */

function setup() {
  createCanvas(720, 400);
  background(51);
  noStroke();
  noLoop();
}

function draw() {
  drawTarget(width * 0.25, height * 0.4, 200, 4);
  drawTarget(width * 0.5, height * 0.5, 300, 10);
  drawTarget(width * 0.75, height * 0.3, 120, 6);
}

function drawTarget(xloc, yloc, size, num) {
  const grayvalues = 255 / num;
  const steps = size / num;
  for (let i = 0; i < num; i++) {
    fill(i * grayvalues);
    ellipse(xloc, yloc, size - i * steps, size - i * steps);
  }
}
