/*
 * @name Lシステム
 * @arialabel さまざまな色とパターンの円が直交する黒い線でつながれて画面にグリッド形式で描かれます
 * @description このスケッチは、Lindenmayer または（L-）システムに基づいた自動描画を作成します。
 * Lシステムは、手続き型グラフィックスで
 * 自然、幾何学的、または興味深い「フラクタル風」のパターンを作成するためによく使用されます。<br>
 * 例作成者：<a href='http://lukedubois.com/' target='_blank'>R. Luke DuBois</a>。<br>
 * <a href='https://en.wikipedia.org/wiki/L-system'>https://en.wikipedia.org/wiki/L-system</a>
 */
// タートル関連の変数:
let x, y; // タートルの現在位置
let currentangle = 0; // タートルが向いている方向
let step = 20; // タートルが「F」で動く量
let angle = 90; // タートルが「-」または「+」で回転する角度

// LINDENMAYER関連の変数 (L-システム)
let thestring = 'A'; // 文字列の開始点（アキシオム）
let numloops = 5; // 事前計算する反復回数
let therules = []; // ルールの配列
therules[0] = ['A', '-BF+AFA+FB-']; // 最初のルール
therules[1] = ['B', '+AF-BFB-FA+']; // 二番目のルール

let whereinstring = 0; // L-システム内のどこにいるか？

function setup() {
  createCanvas(710, 400);
  background(255);
  stroke(0, 0, 0, 255);

  // xとyの位置を左下隅に設定
  x = 0;
  y = height-1;

  // L-システムを計算
  for (let i = 0; i < numloops; i++) {
    thestring = lindenmayer(thestring);
  }
}

function draw() {

  // 文字列の現在の文字を描画
  drawIt(thestring[whereinstring]);

  // 文字列を読み取るポイントをインクリメントする。
  // 終わりに達したらループする。
  whereinstring++;
  if (whereinstring > thestring.length-1) whereinstring = 0;

}

// Lシステムを解釈する
function lindenmayer(s) {
  let outputstring = ''; // 空の出力文字列を開始する

  // ‘therules’ をシンボルにマッチングしていく:
  for (let i = 0; i < s.length; i++) {
    let ismatch = 0; // マッチしない場合をデフォルトに設定
    for (let j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0])  {
        outputstring += therules[j][1]; // 置換を書き込む
        ismatch = 1; // マッチしたので、シンボルをコピーしない
        break; // このfor()ループを抜ける
      }
    }
    // マッチするものがない場合、シンボルをコピーする。
    if (ismatch == 0) outputstring+= s[i];
  }

  return outputstring; // 修正された文字列を送信する
}

// これはタートルのコマンドを描画するカスタム関数です。
function drawIt(k) {

  if (k=='F') { // 前進する 
    // ステップと現在の角度に基づいた極座標から直交座標への変換:
    let x1 = x + step*cos(radians(currentangle));
    let y1 = y + step*sin(radians(currentangle));
    line(x, y, x1, y1); // 古い座標と新しい座標を接続する

    // タートルの位置を更新する:
    x = x1;
    y = y1;
  } else if (k == '+') {
    currentangle += angle; // 左に曲がる
  } else if (k == '-') {
    currentangle -= angle; // 右に曲がる
  }

  // ランダムな色の値を生成する:
  let r = random(128, 255);
  let g = random(0, 192);
  let b = random(0, 50);
  let a = random(50, 100);

  // 半径のガウス分布（D&D）を選ぶ:
  let radius = 0;
  radius += random(0, 15);
  radius += random(0, 15);
  radius += random(0, 15);
  radius = radius / 3;

  // ものを描画する:
  fill(r, g, b, a);
  ellipse(x, y, radius, radius);
}