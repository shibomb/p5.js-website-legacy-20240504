/*
 * @name フロッキング
 * @arialabel グレーの小さな三角形のグループが、濃いグレーの背景をバックにして移動します。
 * @description Craig Reynolds の「フロッキング」動作のデモンストレーション。
 * 参照：http://www.red3d.com/cwr/
 * ルール：Cohesion（結束）、Separation（分離）、Alignment（整列）
 * （<a href="http://natureofcode.com">natureofcode.com</a> より）。
 * マウスをドラッグしてボイド（グレーの小さな三角形）を追加します。
 */


let flock;

function setup() {
  createCanvas(640, 360);
  createP("マウスをドラッグして新しいボイドを生成します。");

  flock = new Flock();
  // システムに最初のボイドのセットを追加します。
  for (let i = 0; i < 100; i++) {
    let b = new Boid(width / 2,height / 2);
    flock.addBoid(b);
  }
}

function draw() {
  background(51);
  flock.run();
}

// システムに新しいボイドを追加します。
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock オブジェクト
// 単純にすべてのボイドの配列を管理するだけで、ほとんど何もしません。

function Flock() {
  // すべてのボイドのための配列
  this.boids = []; // 配列を初期化します。
}

Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // 各ボイドに個別にボイドのリスト全体を渡します。
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid クラス
// 分離、結束、整列のメソッドが追加されています。

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3;    // 最大速度
  this.maxforce = 0.05; // 最大操舵力
}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // A = F / M を求める場合は、ここで質量を追加できます。
  this.acceleration.add(force);
}

// 三つのルールに基づいて、新しい加速度を蓄積します。
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids);   // 分離
  let ali = this.align(boids);      // 整列
  let coh = this.cohesion(boids);   // 結束
  // これらの力に任意の重みをかけます。
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // 力ベクトルを加速度に加えます。
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// 位置を更新するメソッド
Boid.prototype.update = function() {
  // 速度を更新します。
  this.velocity.add(this.acceleration);
  // 速度を制限します。
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // 各サイクルで加速度を0にリセットします。
  this.acceleration.mult(0);
}

// ターゲットに向かう操舵力を計算して適用するメソッド
// STEER = DESIRED - VELOCITY
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target,this.position);  // 現在の位置からターゲットへのベクトル
  // desired を正規化し、最大速度でスケーリングします。
  desired.normalize();
  desired.mult(this.maxspeed);
  // ステアリングのベクトル = 希望ベクトル - 現在のベクトル
  let steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // 最大操舵力に制限します。
  return steer;
}

Boid.prototype.render = function() {
  // 速度の方向に回転した三角形を描画します。
  let theta = this.velocity.heading() + radians(90);
  fill(127);
  stroke(200);
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r * 2);
  vertex(-this.r, this.r * 2);
  vertex(this.r, this.r * 2);
  endShape(CLOSE);
  pop();
}

// 周回
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width + this.r;
  if (this.position.y < -this.r)  this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// 分離
// 近くのボイドをチェックして、それらから離れる方向に舵を切るメソッド
Boid.prototype.separate = function(boids) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  // システム内のすべてのボイドについて、近すぎるかどうかをチェックします。
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    // 距離が0より大きく、任意の量より小さい場合（自分自身の場合は0）
    if ((d > 0) && (d < desiredseparation)) {
      // 隣のボイドから離れるベクトルを計算します。
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // 距離による重み付け
      steer.add(diff);
      count++;            // いくつあるかを追跡します。
    }
  }
  // 平均 -- いくつあるかで割ります。
  if (count > 0) {
    steer.div(count);
  }

  // ベクトルが0より大きい限り
  if (steer.mag() > 0) {
    // レイノルズの実装: ステアリングのベクトル = 希望ベクトル - 現在のベクトル
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// 整列
// システム内のすべての隣り合うボイドについて、平均速度を計算します。
Boid.prototype.align = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0,0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// 凝集
// すべての隣り合うボイドの平均位置（つまり、中心）に対して、その位置に向かうステアリングのベクトルを計算します。
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);   // 空のベクトルから始めて、すべての位置を蓄積します。
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // 位置を追加します。
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // その位置に向かって舵を切ります。
  } else {
    return createVector(0, 0);
  }
}