/*
 * @name コッホ曲線
 * @arialabel 一本の白い水平線が黒い背景上に描かれ、途中で三角形に変形し、三角形の各辺がまた二つの三角形になるようになり、これが5回繰り返されてできる雪の結晶を生成します。
 * @description 簡単なフラクタル：コッホ曲線を描画します。再帰レベルが順番に描かれます。
 * Daniel Shiffman によるものです。
 */

let k;

function setup() {
  createCanvas(710, 400);
  frameRate(1);  // アニメーションをゆっくりに
  k = new KochFractal();
}

function draw() {
  background(0);
  // 雪片を描く！
  k.render();
  // 進行
  k.nextLevel();
  // 5回以上繰り返さないように ...
  if (k.getCount() > 5) {
    k.restart();
  }
}

// フラクタルの1つの線分を説明するクラス
// コッホアルゴリズムに従って、線分に沿って中間p5.Vectorを計算するメソッドを含む

class KochLine {
  constructor(a,b) {
    // 2つのp5.Vector、
    // startは「左側」のp5.Vector
    // endは「右側」のp5.Vector
    this.start = a.copy();
    this.end = b.copy();
  }

  display() {
    stroke(255);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  kochA() {
    return this.start.copy();
  }

  // 単純に3分の1の距離です
  kochB() {
    let v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    v.add(this.start);
    return v;
  }

  // もう少し複雑で、このp5.Vectorがどこにあるかを計算するために少し三角関数を使う必要があります！
  kochC() {
    let a = this.start.copy(); // 最初から始めます
    let v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    a.add(v);  // ポイントBに移動
    v.rotate(-PI/3); // 60度回転
    a.add(v);  // ポイントCに移動
    return a;
  }

  // 単純に距離の2/3
  kochD() {
    let v = p5.Vector.sub(this.end, this.start);
    v.mult(2/3.0);
    v.add(this.start);
    return v;
  }

  kochE() {
    return this.end.copy();
  }
}

// 雪片パターンの線分リストを管理するクラス

class KochFractal {
  constructor() {
    this.start = createVector(0,height-20);   // 開始用のp5.Vector
    this.end = createVector(width,height-20); // 終了用のp5.Vector
    this.lines = [];                         // すべての線を追跡する配列
    this.count = 0;
    this.restart();
  }

  nextLevel() {
    // 配列リストにある各線について
    // 新しい配列リストに4つの線を作成します
    this.lines = this.iterate(this.lines);
    this.count++;
  }

  restart() {
    this.count = 0;      // カウントをリセット
    this.lines = [];  // 配列リストを空にする
    this.lines.push(new KochLine(this.start,this.end));  // 初期線（1つのエンドp5.Vectorからもう1つのエンドp5.Vectorへ）を追加
  }

  getCount() {
    return this.count;
  }

  // すべての線を描画するだけです
  render() {
    for(let i = 0; i < this.lines.length; i++) {
      this.lines[i].display();
    }
  }

  // ここが **MAGIC**が起こる場所です
  // ステップ1：空の配列リストを作成
  // ステップ2：現在の配列リストにあるすべての線について
  //   - コッホアルゴリズムに基づいて4つの線分を計算する
  //   - すべての4つの線分を新しい配列リストに追加する
  // ステップ3：新しい配列リストを返し、それが構造の線分リストになります

  // これを何度も繰り返すと、各線が4つの線に分かれ、4つの線に分かれ、、、と繰り返すようになります
  iterate(before) {
    let now = [];    // 空のリストを作成します
    for(let i = 0; i < this.lines.length; i++) {
      let l = this.lines[i];
      // コッホ p5.Vectorを5つ計算します（線オブジェクトによって行われます）
      let a = l.kochA();
      let b = l.kochB();
      let c = l.kochC();
      let d = l.kochD();
      let e = l.kochE();
      // すべてのp5.Vector間に線分を作成して追加します
      now.push(new KochLine(a,b));
      now.push(new KochLine(b,c));
      now.push(new KochLine(c,d));
      now.push(new KochLine(d,e));
    }
    return now;
  }
}
