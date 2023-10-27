/*
 * @name 相対性
 * @arialabel グレー、ブルー、グリーン、オレンジの4本の縞模様があります。
画面の上半分と下半分では表示順が異なるため、色の見え方が異なっています。
 * @description 各色は他の色との関係で知覚されます。
 * 上部および下部のバーは
 * それぞれ同じ色の種類で構成されていますが、
 * 表示順序が異なることにより、それぞれの色が違って見えます。
 */
let a, b, c, d, e;

function setup() {
  createCanvas(710, 400);
  noStroke();
  a = color(165, 167, 20);
  b = color(77, 86, 59);
  c = color(42, 106, 105);
  d = color(165, 89, 20);
  e = color(146, 150, 127);
  noLoop(); // 描画は1回のみです。
}

function draw() {
  drawBand(a, b, c, d, e, 0, width / 128);
  drawBand(c, a, d, b, e, height / 2, width / 128);
}

function drawBand(v, w, x, y, z, ypos, barWidth) {
  let num = 5;
  let colorOrder = [v, w, x, y, z];
  for (let i = 0; i < width; i += barWidth * num) {
    for (let j = 0; j < num; j++) {
      fill(colorOrder[j]);
      rect(i + j * barWidth, ypos, barWidth, height / 2);
    }
  }
}
