/*
 * @name ウェブカメラを使用したシェーダー
 * @arialabel ユーザーの内蔵ウェブカメラで表示されるシーンにネオンテクスチャが追加されます。
 * @description ウェブカメラはテクスチャーとしてシェーダーに渡すことができます。
 * <br>p5.jsでシェーダーを使用する方法について、詳しくはこちらを参照してください: <a href="https://itp-xstory.github.io/p5js-shaders/">p5.jsシェーダー</a>
 */

 // この変数にシェーダー オブジェクトを保持します。
 let theShader;
 // この変数にウェブカメラ映像を保持します。
 let cam;

 function preload(){
   // シェーダーを読み込みます。
   theShader = loadShader('assets/webcam.vert', 'assets/webcam.frag');
 }

 function setup() {
   // シェーダーを使うためにはWEBGLモードにする必要があります。
   createCanvas(710, 400, WEBGL);
   noStroke();

   cam = createCapture(VIDEO);
   cam.size(710, 400);

   cam.hide();
 }

 function draw() {
  // shader()関数でアクティブなシェーダーを設定します。
  shader(theShader);

   // ウェブカメラ映像をテクスチャーとして渡します。
   theShader.setUniform('tex0', cam);

  // rect関数は画面上に幾何学図形を描画します。
  rect(0,0,width,height);
 }
