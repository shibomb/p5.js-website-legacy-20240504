/*
 * @name Flocking
 * @arialabel グレーの小さな三角形のグループが、より濃いグレーの背景を移動する
 * @description Craig Reynoldsの「Flocking」動作のデモンストレーション。
 * 参照：http://www.red3d.com/cwr/
 * ルール：Cohesion（結束）、Separation（分離）、Alignment（整列）
 * (from <a href="http://natureofcode.com">natureofcode.com</a>).
 * マウスをドラッグしてboidsを追加します。
 */


let flock;

function setup() {
  createCanvas(640, 360);
  createP("マウスをドラッグして新しいboidsを生成します。");

  flock = new Flock();
  // システムに最初の一連のboidsを追加
  for (let i = 0; i < 100; i++) {
    let b = new Boid(width / 2,height / 2);
    flock.addBoid(b);
  }
}

function draw() {
  background(51);
  flock.run();
}

// システムに新しいboidを追加
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flockオブジェクト
// ほとんど何もしない、単純にすべてのboidsの配列を管理する

function Flock() {
  // すべてのboidsのための配列
  this.boids = []; // 配列を初期化
}

Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // 各boidに個別にboidsのリスト全体を渡す
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boidクラス
// 分離、結束、整列のメソッドが追加された

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
  // A = F / M のようにここに質量を追加したい場合
  this.acceleration.add(force);
}

// 三つのルールに基づいて、新しい加速度を蓄積する
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids);   // 分離
  let ali = this.align(boids);      // 整列
  let coh = this.cohesion(boids);   // 結束
  // これらの力に任意の重みをかける
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // 力ベクトルを加速度に加える
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// 位置を更新するメソッド
Boid.prototype.update = function() {
  // 速度を更新
  this.velocity.add(this.acceleration);
  // 速度を制限
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // 各サイクルで加速度を0にリセット
  this.acceleration.mult(0);
}

// ターゲットに向かう操舵力を計算して適用するメソッド
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target,this.position);  // 位置からターゲットへのベクトル
  // desiredを正規化し、最大速度でスケーリング
  desired.normalize();
  desired.mult(this.maxspeed);
  // 操舵 = 望ましい - 速度
  let steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // 最大操舵力に制限
  return steer;
}

Boid.prototype.render = function() {
  // 速度の方向に回転した三角形を描画
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
// 近くのボイドをチェックして、それらから離れる方向に操舵するメソッド
Boid.prototype.separate = function(boids) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  // システム内のすべてのボイドについて、それが近すぎるかどうかをチェックする
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    // 距離が0より大きく、任意の量より小さい場合（自分自身の場合は0）
    if ((d > 0) && (d < desiredseparation)) {
      // 隣人から遠ざかるベクトルを計算する
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // 距離による重み付け
      steer.add(diff);
      count++;            // いくつかあるかを追跡する
    }
  }
  // 平均 -- いくつあるかで割る
  if (count > 0) {
    steer.div(count);
  }

  // ベクトルが0より大きい限り
  if (steer.mag() > 0) {
    // レイノルズの実装: 操舵 = 目的 - 速度
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// 整列
// システム内のすべての近くのボイドについて、平均速度を計算する
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
// すべての近くのボイドの平均位置（つまり、中心）に対して、その位置に向かう操舵ベクトルを計算する
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);   // すべての位置を蓄積する空のベクトルから始める
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // 位置を追加
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // その位置に向かって操舵する
  } else {
    return createVector(0, 0);
  }
}