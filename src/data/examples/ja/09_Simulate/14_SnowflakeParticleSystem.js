/*
 * @name スノーフレーク
 * @arialabel 赤い背景からランダムなパターンで白い雪片が落ちます。
 * @description 落ちる雪片の動きをシミュレートするパーティクルシステム。
 * 雪片のパーティクルを保持するためのオブジェクト配列を使用しています。
 * Aatish Bhatiaによる貢献です。
 */

let snowflakes = []; // 雪片のオブジェクトを保持する配列

function setup() {
  createCanvas(400, 600);
  fill(240);
  noStroke();
}

function draw() {
  background('brown');
  let t = frameCount / 60; // 時間の更新

  // ランダムな数の雪片を毎フレーム生成する
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // 雪片のオブジェクトを追加
  }

  // for..ofループで雪片をループする
  for (let flake of snowflakes) {
    flake.update(t); // 雪片の位置を更新
    flake.display(); // 雪片を描画
  }
}

// 雪片クラス
function snowflake() {
  // 座標の初期化
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // 雪片のらせんの半径
  // 雪片が面積で均等に広がるように選ばれています
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x位置は円を追従します
    let w = 0.6; // 角速度
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // サイズの異なる雪片はわずかに異なるy速度で落ちます
    this.posY += pow(this.size, 0.5);

    // 画面の端を超えた雪片を削除する
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}
