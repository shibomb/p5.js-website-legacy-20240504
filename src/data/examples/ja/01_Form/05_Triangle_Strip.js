/*
 * @name 細切れの三角形
 * @arialabel 灰色の背景に白い三角形のリングが七角形を形作っています。ユーザーがマウスを左から右にドラッグすると、三角形の数が増え、より滑らかな円形のリングができます。
 * @description  Ira Greenberg が作成した実例です。
 * vertex() 関数と beginShape(TRIANGLE_STRIP) モードを使用して閉じた環を生成します。
 * outsideRadius および insideRadius 変数は、それぞれリングの半径を制御しています。
 */
let x;
let y;
let outsideRadius = 150;
let insideRadius = 100;

function setup() {
  createCanvas(720, 400);
  background(204);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(204);

  let numPoints = int(map(mouseX, 0, width, 6, 60));
  let angle = 0;
  let angleStep = 180.0 / numPoints;

  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i <= numPoints; i++) {
    let px = x + cos(radians(angle)) * outsideRadius;
    let py = y + sin(radians(angle)) * outsideRadius;
    angle += angleStep;
    vertex(px, py);
    px = x + cos(radians(angle)) * insideRadius;
    py = y + sin(radians(angle)) * insideRadius;
    vertex(px, py);
    angle += angleStep;
  }
  endShape();
}
