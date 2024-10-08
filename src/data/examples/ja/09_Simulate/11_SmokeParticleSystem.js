/*
 * @name 煙のパーティクル
 * @arialabel 画面の下部の中央に白い円があります。円から煙が出て、ユーザーのマウスの動きに合わせて左右に移動します。また、上部に白い矢印があり、ユーザーのマウスの位置を指示しています。
 * @description Dan Shiffman によって Processing 用に書かれたオリジナルの SmokeParticleSystem の例を移植したものです。
 * 煙のようなパーティクルを作成します :p
 */

// パーティクルのテクスチャ
let particle_texture = null;

// パーティクルシステムの変数
let ps = null;

function preload() {
  particle_texture = loadImage("assets/particle_texture.png");
}

function setup() {

  // キャンバスのサイズを設定します。
  createCanvas(640, 360);

  // パーティクルシステムを初期化します。
  ps = new ParticleSystem(0, createVector(width / 2, height - 60), particle_texture);
}

function draw() {
  background(0);

  let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);

  ps.applyForce(wind);
  ps.run();
  for (let i = 0; i < 2; i++) {
    ps.addParticle();
  }

  // 風力を表す矢印を描きます。
  drawVector(wind, createVector(width / 2, 50, 0), 500);
}

/**
 *  風がどの方向に吹いているかを表す矢印を描く関数
 */
function drawVector(v, loc, scale){
  push();
  let arrowsize = 4;
  translate(loc.x, loc.y);
  stroke(255);
  rotate(v.heading());

  let len = v.mag() * scale;
  line(0, 0, len,0);
  line(len, 0, len-arrowsize, +arrowsize / 2);
  line(len, 0, len-arrowsize, -arrowsize / 2);
  pop();
}
//========= パーティクルシステム ===========

/**
 * 基本的なパーティクルシステムクラス
 * @param num パーティクルの数
 * @param v パーティクルシステムの原点
 * @param img_ システム内の各パーティクルに適用されるテクスチャ
 * @constructor
 */
let ParticleSystem = function(num, v, img_) {

  this.particles = [];
  this.origin = v.copy(); // オリジナルを誤って変更しないようにベクトル値をコピーします。
  this.img = img_
  for(let i = 0; i < num; ++i){
    this.particles.push(new Particle(this.origin, this.img));
  }
};

/**
 *  パーティクルシステム全体を実行するメソッド
 */
ParticleSystem.prototype.run = function() {

  // ループ内で使用する配列の長さを一時変数に記憶します。
  // たまに for ループで <variable>.length を見ることがありますが、
  // ここでは、配列をループするたびに再計算されないようにキャッシュしています。
  let len = this.particles.length;

  // パーティクルをループさせます。
  for (let i = len - 1; i >= 0; i--) {
    let particle = this.particles[i];
    particle.run();

    // パーティクルが死んだ場合は削除します。
    // JavaScript の配列には「remove」関数がありませんが、「splice」を使って同じような処理ができます。
    // 削除を始める位置のインデックス、そしてそのポイントから何個削除するかを指定します。
    if (particle.isDead()) {
      this.particles.splice(i, 1);
    }
  }
}

/**
 * 向きを表す p5.Vector でパーティクルシステム内のすべてのパーティクルに力を加えるメソッド
 * @param dir 力の方向を示す p5.Vector
 */
ParticleSystem.prototype.applyForce = function(dir) {
  let len = this.particles.length;
  for(let i = 0; i < len; ++i){
    this.particles[i].applyForce(dir);
  }
}

/**
 * システムの原点に、最初に設定されたテクスチャで新しいパーティクルをシステムに追加します。
 * 
 */
ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin, this.img));
}

//========= パーティクル  ===========
/**
 *  画像としてパーティクルを表示するシンプルなパーティクルクラス
 */
let Particle = function (pos, img_) {
  this.loc = pos.copy();

  let vx = randomGaussian() * 0.3;
  let vy = randomGaussian() * 0.3 - 1.0;

  this.vel = createVector(vx, vy);
  this.acc = createVector();
  this.lifespan = 100.0;
  this.texture = img_;
}

/**
 *  パーティクルを同時に更新、表示するメソッド
 */
Particle.prototype.run = function() {
  this.update();
  this.render();
}

/**
 *  パーティクルを表示するメソッド
 */
Particle.prototype.render = function() {
  imageMode(CENTER);
  tint(255, this.lifespan);
  image(this.texture, this.loc.x, this.loc.y);
}

/**
 *  パーティクルに力のベクトルを適用するメソッド
 */
Particle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

/**
 *  パーティクルが寿命に達したかどうかをチェックします。
 *  寿命に達していた場合は true、そうでなければ false を返します。
 */
Particle.prototype.isDead = function () {
  if (this.lifespan <= 0.0) {
    return true;
  } else {
    return false;
  }
}

/**
 *  パーティクルの位置を更新するメソッド
 */
Particle.prototype.update = function() {
  this.vel.add(this.acc);
  this.loc.add(this.vel);
  this.lifespan -= 2.5;
  this.acc.mult(0);
}