/*
 * @name 非直交反射
 * @arialabel 白い円が黒い画面内を跳ねながら、灰色の傾いた床に白い痕跡を残します。灰色の床はいくつかのフレームごとに変化します。
 * @frame 710,400 (オプション)
 * @description これは processing.org/examples の「Reflection 1」を、David Blitz が移植したものです。
 */

// 床の左側の位置
let base1;

// 床の右側の位置
let base2;
// 床の長さ
// let baseLength;

// 移動するボールに関連する変数
let position;
let velocity;
let r = 6;
let speed = 3.5;

function setup() {
  createCanvas(710, 400);

  fill(128);
  base1 = createVector(0, height - 150);
  base2 = createVector(width, height);
  // createGround();

  // 画面の中央上部をボールのスタート地点とします。
  position = createVector(width / 2, 0);

  // 初期ランダムベロシティを計算します。
  velocity = p5.Vector.random2D();
  velocity.mult(speed);
}

function draw() {
  // 背景を描画します。
  fill(0, 12);
  noStroke();
  rect(0, 0, width, height);

  // 床を描画します。
  fill(200);
  quad(base1.x, base1.y, base2.x, base2.y, base2.x, height, 0, height);

  // 床の上部の法線 (normal) を計算します。
  let baseDelta = p5.Vector.sub(base2, base1);
  baseDelta.normalize();
  let normal = createVector(-baseDelta.y, baseDelta.x);
  let intercept = p5.Vector.dot(base1, normal);

  // ボールを描きます。
  noStroke();
  fill(255);
  ellipse(position.x, position.y, r * 2, r * 2);

  // ボールを移動します。
  position.add(velocity);

  // 正規化された入射ベクトル
  incidence = p5.Vector.mult(velocity, -1);
  incidence.normalize();

  // 床との衝突を検出して処理します。
  if (p5.Vector.dot(normal, position) > intercept) {
    // 入射ベクトルと床上面のドット積を計算します。
    let dot = incidence.dot(normal);

    // 反射ベクトルを計算します。
    // 反射ベクトルを方向ベクトルに代入します。
    velocity.set(
      2 * normal.x * dot - incidence.x,
      2 * normal.y * dot - incidence.y,
      0
    );
    velocity.mult(speed);

    // 床の上面の衝突点に法線を描画します。
    stroke(255, 128, 0);
    line(
      position.x,
      position.y,
      position.x - normal.x * 100,
      position.y - normal.y * 100
    );
  }
  // }

  // 境界の衝突を検知します。
  // 右
  if (position.x > width - r) {
    position.x = width - r;
    velocity.x *= -1;
  }
  // 左
  if (position.x < r) {
    position.x = r;
    velocity.x *= -1;
  }
  // 上
  if (position.y < r) {
    position.y = r;
    velocity.y *= -1;

    // 床の上面をランダムに変更します。
    base1.y = random(height - 100, height);
    base2.y = random(height - 100, height);
  }
}
