/*
* @name Copy()メソッド
* @arialabel 白黒で描かれたオウムを表示します。マウスカーソルがペイントブラシとなり、画像の上でマウスを押し続けるとその領域に色が付きます。
* @frame 600,400
* @description copy()メソッドを使用して画像の着色をシミュレートする方法の例
*/
let draft, ready;
function preload() {
  ready = loadImage("assets/parrot-color.png");
  draft = loadImage("assets/parrot-bw.png");
}
function setup() {
  createCanvas(600, 400);
  noCursor();
  cursor("assets/brush.png", 20, -10);
  image(ready, 0, 0);
  image(draft, 0, 0);
}
function mouseDragged() {
  copy(ready, mouseX, mouseY, 20, 20, mouseX, mouseY, 20, 20);
}
