/*
 * @name 柔らかい物体
 * @arialabel 黒い画面の上の白い五角形があり、それは何かのかたまりに形を変化させながらマウスを追従します。
 * @description Ira Greenberg氏によるオリジナルのサンプルです。
 * <br><br>curveVertex()およびcurveTightness()を使用した柔らかい物体の動的シミュレーションです。
 */
// 中心点
let centerX = 0.0, centerY = 0.0;

let radius = 45, rotAngle = -90;
let accelX = 0.0, accelY = 0.0;
let deltaX = 0.0, deltaY = 0.0;
let springing = 0.0009, damping = 0.98;

// 角のノード
let nodes = 5;

// ゼロで配列を埋める
let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];

// 柔らかい物体のダイナミクス
let organicConstant = 1.0;

function setup() {
  createCanvas(710, 400);

  // ウィンドウの中央に形状を置く
  centerX = width / 2;
  centerY = height / 2;

  // 配列を0で初期化
  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = 0;
    nodeStartY[i] = 0;
    nodeY[i] = 0;
    nodeY[i] = 0;
    angle[i] = 0;
  }

  // 角のノードの周波数を初期化
  for (let i = 0; i < nodes; i++){
    frequency[i] = random(5, 12);
  }

  noStroke();
  frameRate(30);
}

function draw() {
  // 背景をフェードする
  fill(0, 100);
  rect(0, 0, width, height);
  drawShape();
  moveShape();
}

function drawShape() {
  // ノードの初期位置を計算
  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = centerX + cos(radians(rotAngle)) * radius;
    nodeStartY[i] = centerY + sin(radians(rotAngle)) * radius;
    rotAngle += 360.0 / nodes;
  }

  // 多角形を描く
  curveTightness(organicConstant);
  fill(255);
  beginShape();
  for (let i = 0; i < nodes; i++){
    curveVertex(nodeX[i], nodeY[i]);
  }
  for (let i = 0; i < nodes-1; i++){
    curveVertex(nodeX[i], nodeY[i]);
  }
  endShape(CLOSE);
}

function moveShape() {
  // 中心点を移動
  deltaX = mouseX - centerX;
  deltaY = mouseY - centerY;

  // スプリングの効果を作成
  deltaX *= springing;
  deltaY *= springing;
  accelX += deltaX;
  accelY += deltaY;

  // 中心を移動
  centerX += accelX;
  centerY += accelY;

  // スプリングの減衰を遅くする
  accelX *= damping;
  accelY *= damping;

  // 曲線の引っ張りを変更
  organicConstant = 1 - ((abs(accelX) + abs(accelY)) * 0.1);

  // ノードを移動する
  for (let i = 0; i < nodes; i++){
    nodeX[i] = nodeStartX[i] + sin(radians(angle[i])) * (accelX * 2);
    nodeY[i] = nodeStartY[i] + sin(radians(angle[i])) * (accelY * 2);
    angle[i] += frequency[i];
  }
}
