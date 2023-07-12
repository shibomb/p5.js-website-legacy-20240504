/*
 * @name 保存されたテーブルの読み込み
 * @arialabel ４つのラベル付きの白い丸があります。
 * @description Bubble クラスを作成し、csv ファイルのデータを使って複数のバブルをインスタンス化し、
 * 結果を画面上に表示します。
 * Web ブラウザによってファイルの保存場所が異なるため、
 * Processing の例とは異なり、saveTable は利用していません。<br><br>
 * Processing 向けの Daniel Shiffman の<a href="https://processing.org/examples/loadsavetable.html">LoadSaveTable の例</a>をベースにしています。
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

let table; // loadTable 呼び出しの結果を保持するグローバルオブジェクト
let bubbles = []; // すべてのバブルオブジェクトを保持するグローバル配列

// 非同期データロードを preload に置き、 "setup " 実行前に完了させます。
function preload() {
  table = loadTable("assets/bubbles.csv", "header");
}

// 保存したバブルデータをバブルオブジェクトに変換します。
function loadData() {
  const bubbleData = table.getRows();
  // Bubbleオブジェクトの配列の大きさは、CSV の総行数によって決定されます。
  const length = table.getRowCount();

  for (let i = 0; i < length; i++) {
    // 位置、直径、名称を取得します。
    const x = bubbleData[i].getNum("x");
    const y = bubbleData[i].getNum("y");
    const diameter = bubbleData[i].getNum("diameter");
    const name = bubbleData[i].getString("name");

    // オブジェクトを配列に追加します。
    bubbles.push(new Bubble(x, y, diameter, name));
  }
}

// マウスをクリックするたびに新しい Bubble を作成します。
function mousePressed() {
  // 新しい行を作成します。
  let row = table.addRow();

  let name = "New Bubble";
  let diameter = random(40, 80);

  // その行に値を設定します。
  row.setNum("x", mouseX);
  row.setNum("y", mouseY);
  row.setNum("diameter", diameter);
  row.setString("name", name);

  bubbles.push(new Bubble(mouseX, mouseY, diameter, name));

  // テーブルが 10 行以上ある場合は、
  if (table.getRowCount() > 10) {
    // 最も古い行を削除します。
    table.removeRow(0);
    bubbles.shift();
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
  text("Click to add bubbles.", 10, height - 10);
}
