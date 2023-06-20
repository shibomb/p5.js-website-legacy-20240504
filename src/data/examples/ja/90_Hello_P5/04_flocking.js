/*
 * @name フロッキング
 * @arialabel 濃いグレーの背景に薄いグレーの円が群れをなして画面を横切ります。
 * @description <a href="http://www.red3d.com/cwr/"> Craig Reynolds の「群れ」行動</a>のデモです。<br>
 * (ルール: 凝集、分離、整列)<br>
 * <a href="http://natureofcode.com">natureofcode.com</a> より。
 */
let boids = [];

function setup() {
  createCanvas(720, 400);

  // ボイド( boids )の初期セットをシステムに追加します。
  for (let i = 0; i < 100; i++) {
    boids[i] = new Boid(random(width), random(height));
  }
}

function draw() {
  background(51);
  // すべてのボイドを走らせます。
  for (let i = 0; i < boids.length; i++) {
    boids[i].run(boids);
  }
}

// Boid クラス
// 分離、凝集、整列のためのメソッドを追加しました。
class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 3;    // 最高速度
    this.maxforce = 0.05; // ステアリングの最大の力
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }
  
  // 力を加速度に加えます。
  applyForce(force) {
    this.acceleration.add(force);
  }
  
  //3つのルールに基づき、毎回新しい加速度を蓄積していきます。
  flock(boids) {
    let sep = this.separate(boids); // 分離
    let ali = this.align(boids);    // 整列
    let coh = this.cohesion(boids); // 凝集
    // これらの力を恣意的に重みづけします。
    sep.mult(2.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // 加速度に力ベクトルを加えます。
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }
  
  // 位置情報を更新するメソッド
  update() {
    // 速度を更新します。
    this.velocity.add(this.acceleration);
    // 速度を制限します。
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // 毎周期、加速度を0にリセットします。
    this.acceleration.mult(0);
  }
  
  // 目標に向かうステアリングの力を算出し、適用するメソッド
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // 位置からターゲットを指すベクトル
    // 望ましい速度(desired)を正規化し、最高速へスケールします。
    desired.normalize();
    desired.mult(this.maxspeed);
    // ステアリング ＝ 望ましい速度 ー 速度
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // ステアリングの力を最大値に制限します。
    return steer;
  }
  
  // ボイドを円として描きます。
  render() {
    fill(127, 127);
    stroke(200);
    ellipse(this.position.x, this.position.y, 16, 16);
  }
  
  // ラップアラウンド
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }
  
  // 分離
  // 近くにボイドがいないか確認し、舵を切るメソッド
  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    // システム内のボイドごとに、近すぎるかどうかをチェックします。
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // 距離が0より大きく、任意の量（自分自身の場合は0）より小さい場合
      if ((d > 0) && (d < desiredseparation)) {
        // 近くのボイドから遠ざかるベクトルを計算します。
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // 距離による重みづけをします。
        steer.add(diff);
        count++; // いくつ対象にしたのかを記録します。
      }
    }
    // 平均値 -- いくつで割るか
    if (count > 0) {
      steer.div(count);
    }
  
    // ベクトルが0より大きければよい
    if (steer.mag() > 0) {
      // Reynolds を実装します ： ステアリング = 望ましい - 速度
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }
  
  // 整列
  // システム内の近くのボイドについて、平均速度を計算します。
  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
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
  // 近くのすべてのボイドの平均的な位置（すなわち、近くのすべてのボイドの中心）に対して、その場所に向かうステアリングベクトルを計算します。
  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0); // 空のベクトルでスタートし、すべてのロケーションを蓄積します。
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position); // 位置を追加します。
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // 位置に向かって舵を切ります。
    } else {
      return createVector(0, 0);
    }
  }  
}

