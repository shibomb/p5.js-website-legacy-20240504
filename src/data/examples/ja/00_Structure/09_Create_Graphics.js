/*
 * @name グラフィックス生成
 * @arialabel 黒い背景の画面の真ん中に、非常に濃い灰色の長方形があります。ユーザーのマウスは白で描画されますが、中央の長方形には描画されません。
 * @description グラフィックス生成「createGraphics()」関数は、新しく p5.Renderer オブジェクトを生成して返します。
 * オフスクリーンのグラフィックバッファを描画したいときはこの class を利用します。
 * 2つのパラメーターは幅と高さをピクセル単位で定義しています。
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

  // image() でオフスクリーンバッファを画面に描画します。
  image(pg, 150, 75);
}
