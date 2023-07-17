/*
 * @name ランダム
 * @arialabel 濃淡のある灰色のバーが、0.5秒ごとにランダムに変化します。
 * @description ランダムな数字がこの画像の基礎を作り出します。
 * プログラムがロードされるたびに、結果は異なります。
 */
function setup() {
  createCanvas(710, 400);
  background(0);
  strokeWeight(20);
  frameRate(2);
}

function draw() {
  for (let i = 0; i < width; i++) {
    let r = random(255);
    stroke(r);
    line(i, 0, i, height);
  }
}
