/*
 * @name スノーフレーク
 * @arialabel 赤い背景の上部からランダムなパターンで白い雪片が降り注ぎます。
 * @description 落ちる雪片の動きをシミュレートするパーティクルシステム。
 * 雪片のパーティクルを保持するためのオブジェクト配列を使用しています。
 * Aatish Bhatia の貢献により作成されました。
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

  // for..of ループで雪片をループする
  for (let flake of snowflakes) {
    flake.update(t); // 雪片の位置を更新
    flake.display(); // 雪片を描画
  }
}

// snowflake クラス
function snowflake() {
  // 座標の初期化
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // 雪片のらせんの半径。
  // 雪片が領域内で均等に広がるように選ばれています。
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x 位置は円に合わせて動きます。
    let w = 0.6; // 角速度
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // サイズの異なる雪片はわずかに異なる y 速度で落ちます。
    this.posY += pow(this.size, 0.5);

    // 画面の端を超えた雪片を削除します
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}
