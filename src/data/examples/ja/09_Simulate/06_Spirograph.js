/*
 * @name スパイログラフ
 * @arialabel グレーの背景に黒い円のアウトラインが互いに絡まって回転しているスパイログラフが作成されます。ユーザーがスペースキーを押すと、背景が白くなり、さまざまなサイズの円のパスがインディゴ色で表示されます。
 * @description このスケッチは、シンプルな変換を使用して、
 * 互いに連動する円（サインと呼ばれる）を持つスパイログラフのような効果を作成します。
 * スペースキーを押してトレースと基本のジオメトリを切り替えます。<br>
 * 例作成者：<a href='http://lukedubois.com/' target='_blank'>R. Luke DuBois</a>。<br>
 * <a href='http://en.wikipedia.org/wiki/Spirograph'>http://en.wikipedia.org/wiki/Spirograph</a>
 */
let NUMSINES = 20; // 一度に何個できるか？
let sines = new Array(NUMSINES); // 現在の角度を保持する配列
let rad; // 中心のサインの初期半径値
let i; // カウンタ変数

// これらを操作して、何が起こっているかを理解しましょう：
let fund = 0.005; // 中心のサインの速度
let ratio = 1; // 追加されるサインの速度の乗数は？
let alpha = 50; // トレースシステムの不透明度はどれくらいか

let trace = false; // トレースしていますか？

function setup() {
  createCanvas(710, 400);

  rad = height / 4; // 中心円の半径を計算
  background(204); // 画面をクリア

  for (let i = 0; i<sines.length; i++) {
    sines[i] = PI; // みんなを北向きにスタートさせる
  }
}

function draw() {
  if (!trace) {
    background(204); // ジオメトリを表示している場合は画面をクリア
    stroke(0, 255); // 黒のペン
    noFill(); // 塗りつぶし無し
  }

  // メインアクション
  push(); // 変換行列を開始
  translate(width / 2, height / 2); // 画面の真ん中に移動

  for (let i = 0; i < sines.length; i++) {
    let erad = 0; // 円内の小さな "点" の半径... これはトレース時の 'ペン' です
    // トレースの設定
    if (trace) {
      stroke(0, 0, 255 * (float(i) / sines.length), alpha); // 青色
      fill(0, 0, 255, alpha / 2); // これも、ええと、青色
      erad = 5.0 * (1.0 - float(i) / sines.length); // ペンの太さは、どのサインに関連しているかによって決まります
    }
    let radius = rad / (i + 1); // 円自体の半径
    rotate(sines[i]); // 円を回転させる
    if (!trace) ellipse(0, 0, radius * 2, radius * 2); // シミュレーション中なら、サインを描画
    push(); // 1つ上のレベルへ移動
    translate(0, radius); // サインの端まで移動
    if (!trace) ellipse(0, 0, 5, 5); // 小さな円を描画
    if (trace) ellipse(0, 0, erad, erad); // トレース時にはeradで描画
    pop(); // 1つ下のレベルへ戻る
    translate(0, radius); // 次のサインの位置に移動
    sines[i] = (sines[i] + (fund + (fund * i * ratio))) % TWO_PI; // 基本周波数に基づいて角度を更新
  }

  pop(); // 最終的な変換を取り消す

}

function keyReleased() {
  if (key==' ') {
    trace = !trace;
    background(255);
  }
}