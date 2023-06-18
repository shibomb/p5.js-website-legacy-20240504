/*
 * @name 保存されたJSONの読み込み
 * @arialabel ユーザーが画面をクリックすると、小さな白い円が表示され、ラベルが表示されます。
 * @description Bubble クラスを作成し、JSON ファイルのデータを使って
 * 複数のバブルをインスタンス化し、結果を画面に表示します。
 * Web ブラウザによってファイルの保存場所が異なるため、
 * Processing の例とは異なり、saveJSON は利用していません。<br><br>
 * Processing 向けの Daniel Shiffman の<a href="https://processing.org/examples/loadsavejson.html">LoadSaveJSON サンプル</a>をベースにしています。
 */

// Bubble クラス
class Bubble {
  constructor(x, y, diameter, name) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.radius = diameter / 2;
    this.name = name;

    this.over = false;
  }

  // マウスがバブルの上にあるかどうかを確認します。
  rollover(px, py) {
    let d = dist(px, py, this.x, this.y);
    this.over = d < this.radius;
  }

  // バブルを表示します。
  display() {
    stroke(0);
    strokeWeight(0.8);
    noFill();
    ellipse(this.x, this.y, this.diameter, this.diameter);
    if (this.over) {
      fill(0);
      textAlign(CENTER);
      text(this.name, this.x, this.y + this.radius + 20);
    }
  }
}

let data = {}; // loadJSON 呼び出しの結果を保持するグローバルオブジェクト
let bubbles = []; // すべてのバブルオブジェクトを保持するグローバル配列

// 非同期データロードを preload に置き、 "setup " 実行前に完了させます。
function preload() {
  data = loadJSON('assets/bubbles.json');
}

// 保存したバブルデータをバブルオブジェクトに変換します。
function loadData() {
  let bubbleData = data['bubbles'];
  for (let i = 0; i < bubbleData.length; i++) {
    // 配列内の各オブジェクトを取得します。
    let bubble = bubbleData[i];
    // 位置オブジェクトを取得します。
    let position = bubble['position'];
    // 位置から x, y を取得します。
    let x = position['x'];
    let y = position['y'];

    // 直径とラベルを取得します。
    let diameter = bubble['diameter'];
    let label = bubble['label'];

    // オブジェクトを配列に追加します。
    bubbles.push(new Bubble(x, y, diameter, label));
  }
}

// マウスをクリックするたびに新しい Bubble を作成します。
function mousePressed() {
  // バブルに直径とラベルを追加します。
  let diameter = random(40, 80);
  let label = 'New Label';

  // 新しい JSON バブルオブジェクトを配列に追加します。
  bubbles.push(new Bubble(mouseX, mouseY, diameter, label));

  // バブルの数が多すぎる場合は削除します。
  if (bubbles.length > 10) {
    bubbles.shift(); // 配列から最初の項目を削除します。
  }
}

function setup() {
  createCanvas(640, 360);
  loadData();
}

function draw() {
  background(255);

  // すべてのバブルを表示します。
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].rollover(mouseX, mouseY);
  }

  // 底面のラベルの位置を設定します。
  textAlign(LEFT);
  fill(0);
  text('Click to add bubbles.', 10, height - 10);
}
