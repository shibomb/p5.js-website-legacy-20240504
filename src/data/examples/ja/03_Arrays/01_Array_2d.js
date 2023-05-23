/*
 * @name 二次元配列
 * @arialabel 黒い背景の上にグリッド状に点が描画されています。点は中央に近いほどより暗い色になり、中央から遠ざかるほど白い色になります。
 * @description この構文は二次元（2D）配列の生成の
 * デモンストレーションになります。二次元配列の値は二つのインデックスの値を通してアクセスされます。
 * また、二次元配列は画像保存するのに便利です。このサンプルでは、各点に
 * 画像の中心からの距離と紐付けて色が付けられます。
 */
let distances = [];
let maxDistance;
let spacer;

function setup() {
  createCanvas(720, 360);
  maxDistance = dist(width / 2, height / 2, width, height);
  for (let x = 0; x < width; x++) {
    distances[x] = []; // 入れ子の配列を生成します。
    for (let y = 0; y < height; y++) {
      let distance = dist(width / 2, height / 2, x, y);
      distances[x][y] = (distance / maxDistance) * 255;
    }
  }
  spacer = 10;
  noLoop(); // 一度実行した後停止します。
}

function draw() {
  background(0);
  // この二重のループは「spacer」変数に基づいて配列内の値を
  // スキップします。そのため、配列には描画されているものより多くの値が存在します。
  // 「spacer」変数の値を変更することで
  // 点の密度を変えられます。
  for (let x = 0; x < width; x += spacer) {
    for (let y = 0; y < height; y += spacer) {
      stroke(distances[x][y]);
      point(x + spacer / 2, y + spacer / 2);
    }
  }
}
