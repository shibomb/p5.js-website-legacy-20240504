/*
 * @name ノイズ 2D
 * @arialabel パーリンノイズによる２つのグラデーションが左右に１つずつあります。
 * @frame 710,400 (optional)
 * @description 異なるパラメーターで2Dノイズを作成します。
 *
 */

let noiseVal;
let noiseScale = 0.02;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(0);
  // 画像の左半分を描きます。
  for (let y = 0; y < height - 30; y++) {
    for (let x = 0; x < width / 2; x++) {
      // noiseDetail でノイズのオクターブ数と減衰係数を設定します。
      noiseDetail(2, 0.2);
      noiseVal = noise((mouseX + x) * noiseScale, (mouseY + y) * noiseScale);
      stroke(noiseVal * 255);
      point(x, y);
    }
  }
  // 画像の右半分を描きます。
  for (let y = 0; y < height - 30; y++) {
    for (let x = width / 2; x < width; x++) {
      // noiseDetail でノイズのオクターブ数と減衰係数を設定します。
      noiseDetail(5, 0.5);
      noiseVal = noise((mouseX + x) * noiseScale, (mouseY + y) * noiseScale);
      stroke(noiseVal * 255);
      point(x, y);
    }
  }
  // 2つのパーティションの詳細を表示します。
  textSize(18);
  fill(255, 255, 255);
  text('Noise2D with 2 octaves and 0.2 falloff', 10, 350);
  text('Noise2D with 5 octaves and 0.5 falloff', 330, 350);
}
