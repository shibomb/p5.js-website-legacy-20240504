/*
 * @name 様々な力
 * @arialabel 9つのグレーボールが画面上部から落下し、画面下部の半分に達すると水抵抗により速度が遅くなります。速度の変化は水抵抗により物体が遅くなる様子を模倣しています。
 * @description 複数の力が物体に作用するデモンストレーション
 * (<a href="http://natureofcode.com">natureofcode.com</a>)
 */
// 複数の力が作用するデモンストレーション
// ボディ（Moverクラス）
// ボディは常に重力を受ける
// ボディは「水」の中にあるとき、流体抵抗を受ける

// 5つの移動する物体
let movers = [];

// 液体
let liquid;

function setup() {
  createCanvas(640, 360);
  reset();
  // 液体オブジェクトを作成
  liquid = new Liquid(0, height / 2, width, height / 2, 0.1);
}

function draw() {
  background(127);

  // 水を描画
  liquid.display();

  for (let i = 0; i < movers.length; i++) {

    // Moverは液体の中にあるか？
    if (liquid.contains(movers[i])) {
      // 抵抗力を計算
      let dragForce = liquid.calculateDrag(movers[i]);
      // Moverに抵抗力を適用
      movers[i].applyForce(dragForce);
    }

    // ここで重力は質量によってスケーリングされます
    let gravity = createVector(0, 0.1 * movers[i].mass);
    // 重力を適用
    movers[i].applyForce(gravity);

    // 更新と表示
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }

}


function mousePressed() {
  reset();
}

// Moverオブジェクトをランダムに再開
function reset() {
  for (let i = 0; i < 9; i++) {
    movers[i] = new Mover(random(0.5, 3), 40 + i * 70, 0);
  }
}

let Liquid = function(x, y, w, h, c) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;
};

// MoverはLiquidの中にいますか？
Liquid.prototype.contains = function(m) {
  let l = m.position;
  return l.x > this.x && l.x < this.x + this.w &&
         l.y > this.y && l.y < this.y + this.h;
};

// 抵抗力を計算する
Liquid.prototype.calculateDrag = function(m) {
  // 大きさは係数 * 速度の二乗
  let speed = m.velocity.mag();
  let dragMagnitude = this.c * speed * speed;

  // 方向は速度の逆
  let dragForce = m.velocity.copy();
  dragForce.mult(-1);

  // 大きさに応じてスケールする
  // dragForce.setMag(dragMagnitude);
  dragForce.normalize();
  dragForce.mult(dragMagnitude);
  return dragForce;
};

Liquid.prototype.display = function() {
  noStroke();
  fill(50);
  rect(this.x, this.y, this.w, this.h);
};

function Mover(m, x, y) {
  this.mass = m;
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
}

// ニュートンの第二法則: F = M * A
// または A = F / M
Mover.prototype.applyForce = function(force) {
  let f = p5.Vector.div(force, this.mass);
  this.acceleration.add(f);
};

Mover.prototype.update = function() {
  // 加速度によって速度が変化する
  this.velocity.add(this.acceleration);
  // 位置が速度によって変化する
  this.position.add(this.velocity);
  // 各フレームで加速度をクリアする必要がある
  this.acceleration.mult(0);
};

Mover.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  fill(255,127);
  ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
};

// ウィンドウの下端で跳ね返る
Mover.prototype.checkEdges = function() {
  if (this.position.y > (height - this.mass * 8)) {
    // 下端にぶつかったときに少し減衰させる
    this.velocity.y *= -0.9;
    this.position.y = (height - this.mass * 8);
  }
};
