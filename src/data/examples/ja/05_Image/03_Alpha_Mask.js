/*
 * @name アルファマスク
 * @arialabel 宇宙飛行士の画像を背景に表示し、やや透明な宇宙飛行士の画像が上に表示されています。透過された画像はマウスの水平方向と一緒に移動します。両方の画像には右側に薄い青色のグラデーションがあります。
 * @description 画像の異なる部分で透明度を指定するために、画像の「マスク」を読み込みます。2つの画像は、p5.Imageのmask()メソッドを使用してブレンドされます。
 * <p><em><span class="small"> この例をローカルで実行するには、2つの画像ファイルと実行中の<a href="https://github.com/processing/p5.js/wiki/Local-server">
 * ローカルサーバー</a>が必要です。</span></em></p>
*/
let img;
let imgMask;

function preload() {
  img = loadImage('assets/moonwalk.jpg');
  imgMask = loadImage('assets/mask.png');
}

function setup() {
  createCanvas(720, 400);
  img.mask(imgMask);
  imageMode(CENTER);
}

function draw() {
  background(0, 102, 153);
  image(img, width / 2, height / 2);
  image(img, mouseX, mouseY);
}
