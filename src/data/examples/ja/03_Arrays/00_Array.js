/*
 * @name 配列
 * @arialabel 垂直な線が白背景上を横切り、棒グラフのようにコサイン曲線の値を可視化しています。
 * @description 配列はデータの一覧を意味します。配列内のデータの値ひとつひとつは
 * インデックスの数字を用いて配列内の自分の位置を特定できます。
 * 配列はゼロベースになりますが、これはつまり
 * 配列の最初の要素は[0]、２番目の要素は[1]、これ以降も同様であることを意味します。
 * このサンプルでは、「coswave」という名前の配列が作成され
 * 初期値をコサインの値で埋められます。このデータは画面上に
 * ３分割して表示されます。
 */
let coswave = [];

function setup() {
  createCanvas(720, 360);
  for (let i = 0; i < width; i++) {
    let amount = map(i, 0, width, 0, PI);
    coswave[i] = abs(cos(amount));
  }
  background(255);
  noLoop();
}

function draw() {
  let y1 = 0;
  let y2 = height / 3;
  for (let i = 0; i < width; i += 3) {
    stroke(coswave[i] * 255);
    line(i, y1, i, y2);
  }

  y1 = y2;
  y2 = y1 + y1;
  for (let i = 0; i < width; i += 3) {
    stroke((coswave[i] * 255) / 4);
    line(i, y1, i, y2);
  }

  y1 = y2;
  y2 = height;
  for (let i = 0; i < width; i += 3) {
    stroke(255 - coswave[i] * 255);
    line(i, y1, i, y2);
  }
}
