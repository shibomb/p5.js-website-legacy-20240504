/*
* @name ドローイング
* @arialabel 薄い灰色の背景をクリック＆ドラッグすると、濃い灰色の円を濃い灰色の線でつないだパターンが描かれますが、少しすると消えてしまいます。
* @description ジェネレーティブ・ペインティング・プログラム。
*/

// すべてのパス
let paths = [];
// 描いているかどうか
let painting = false;
// 次の円までどのくらいかかるか
let next = 0;
// 現在地と過去の位置
let current;
let previous;

function setup() {
  createCanvas(720, 400);
  current = createVector(0,0);
  previous = createVector(0,0);
};

function draw() {
  background(200);
  
  // 新しいポイントを処理するタイミングならば
  if (millis() > next && painting) {

    // マウスの位置を把握します。      
    current.x = mouseX;
    current.y = mouseY;

    // 新しいパーティクルの力は、マウスの動きに基づいています。
    let force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    // 新しいパーティクルを追加します。
    paths[paths.length - 1].add(current, force);
    
    // 次の円を処理するタイミングを決定します。
    next = millis() + random(100);

    // マウスの値を保存します。
    previous.x = current.x;
    previous.y = current.y;
  }

  // すべてのパスを描画します。
  for( let i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

// スタートします。
function mousePressed() {
  next = 0;
  painting = true;
  previous.x = mouseX;
  previous.y = mouseY;
  paths.push(new Path());
}

// ストップします。
function mouseReleased() {
  painting = false;
}

// Path はパーティクルのリストです。
class Path {
  constructor() {
    this.particles = [];
    this.hue = random(100);
  }

  add(position, force) {
    // 位置、力、色相を持つ新しいパーティクルを追加します。
    this.particles.push(new Particle(position, force, this.hue));
  }
  
  // パスを更新します。
  update() {  
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
  }  
  
  // パスを表示します。
  display() {    
    // Loop through backwards
    for (let i = this.particles.length - 1; i >= 0; i--) {
      // If we shold remove it
      if (this.particles[i].lifespan <= 0) {
        this.particles.splice(i, 1);
      // Otherwise, display it
      } else {
        this.particles[i].display(this.particles[i+1]);
      }
    }
  
  }  
}

// パス上のパーティクル（粒子）
class Particle {
  constructor(position, force, hue) {
    this.position = createVector(position.x, position.y);
    this.velocity = createVector(force.x, force.y);
    this.drag = 0.95;
    this.lifespan = 255;
  }

  update() {
    // 移動します。
    this.position.add(this.velocity);
    // 減速します・
    this.velocity.mult(this.drag);
    // フェードアウトします。
    this.lifespan--;
  }

  // パーティクルを描き、それを線で結びます。
  // 別のパーティクルに線を引きます。
  display(other) {
    stroke(0, this.lifespan);
    fill(0, this.lifespan/2);    
    ellipse(this.position.x,this.position.y, 8, 8);    
    // もし、線を引く必要があるのならば
    if (other) {
      line(this.position.x, this.position.y, other.position.x, other.position.y);
    }
  }
}
