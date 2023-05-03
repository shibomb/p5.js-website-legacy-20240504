/*
 * @name 基本的なシェーダー
 * @arialabel シアンから紫へのグラデーションの背景です。
 * @description これはp5.jsでシェーダーを読み込む方法の基本的なサンプルです。
 * <br>p5.jsでシェーダーを使用する方法について、詳しくはこちらを参照してください: <a href="https://itp-xstory.github.io/p5js-shaders/">p5.jsシェーダー</a>
 */

// この変数にシェーダー オブジェクトを保持します。
let theShader;

function preload(){
  // シェーダーを読み込みます。
  theShader = loadShader('assets/basic.vert', 'assets/basic.frag');
}

function setup() {
  // シェーダーを使うためにはWEBGLモードにする必要があります。
  createCanvas(710, 400, WEBGL);
  noStroke();
}

function draw() {
  // shader()関数でアクティブなシェーダーを設定します。
  shader(theShader);

  // rect関数は画面上に幾何学図形を描画します。
  rect(0,0,width, height);
}
