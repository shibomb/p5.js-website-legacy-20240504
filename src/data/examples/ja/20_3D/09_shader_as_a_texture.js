/*
 * @name テクスチャのようなシェーダー
 * @arialabel グラデーションが適用された正方形のグリッドに分割された球体です。
 * @description シェーダーは2D/3D形状にテクスチャとして適用できます。
 * <br>p5.jsでシェーダーを使用する方法について、詳しくはこちらを参照してください: <a href="https://itp-xstory.github.io/p5js-shaders/">p5.jsシェーダー</a>
 */

 // この変数にシェーダー オブジェクトを保持します。
 let theShader;
 // この変数にcreateGraphicsで作られるシェーダーテクスチャレイヤーを保持します。
 let shaderTexture;

 let theta = 0;

 let x;
 let y;
 let outsideRadius = 200;
 let insideRadius = 100;

 function preload(){
   // シェーダーを読み込みます。
   theShader = loadShader('assets/texture.vert','assets/texture.frag');
 }

 function setup() {
   // シェーダーを使うためにはWEBGLモードにする必要があります。
   createCanvas(710, 400, WEBGL);
   noStroke();

   // シェーダーテクスチャレイヤーを初期化します。
   shaderTexture = createGraphics(710, 400, WEBGL);

   // シェーダーテクスチャレイヤーのストローク(線)をオフにします。
   shaderTexture.noStroke();

    x = -50;
    y = 0;
 }

 function draw() {

   // アクティブなシェーダーを設定するのではなく、それをシェーダーテクスチャレイヤーに渡しています。
   shaderTexture.shader(theShader);

   // ここではsetUniform()メソッドを使って、シェーダーにユニフォーム値を送信しています。
   theShader.setUniform("resolution", [width, height]);
   theShader.setUniform("time", millis() / 1000.0);
   theShader.setUniform("mouse", [mouseX, map(mouseY, 0, height, height, 0)]);

   // シェーダーテクスチャレイヤーのジオメトリをレンダリングします。
   shaderTexture.rect(0,0,width,height);

   background(255);

   // シェーダーテクスチャレイヤーをテクスチャとして渡します。
   texture(shaderTexture);

   translate(-150, 0, 0);
   push();
   rotateZ(theta * mouseX * 0.0001);
   rotateX(theta * mouseX * 0.0001);
   rotateY(theta * mouseX * 0.0001);
   theta += 0.05;
   sphere(125);
   pop();

   // 滑らかなエッジをもつ楕円を3Dで描くために、第5引数を設定しています。
   ellipse(260,0,200,200,100);
 }
