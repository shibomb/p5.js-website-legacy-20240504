/*
 * @name Create Graphics
 * @arialabel 黒い背景上の真ん中に、非常に濃いグレーの長方形があります。ユーザーのマウスは白で描画されますが、中央の長方形には描画されません。
 * @description 新しくp5.Rendererオブジェクトを生成して返します。
 * オフスクリーンのグラフィック バッファを描画したいときはこのclassを利用します。
 * 二つのパラメータはwidth（幅）とheight（高さ）をピクセル単位で定義しています。
 */

let pg;

function setup() {
  createCanvas(710, 400);
  pg = createGraphics(400, 250);
}

function draw() {
  fill(0, 12);
  rect(0, 0, width, height);
  fill(255);
  noStroke();
  ellipse(mouseX, mouseY, 60, 60);

  pg.background(51);
  pg.noFill();
  pg.stroke(255);
  pg.ellipse(mouseX - 150, mouseY - 75, 60, 60);

  // image()でオフスクリーン バッファを画面に描画します。
  image(pg, 150, 75);
}
