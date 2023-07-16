/*
 * @name 明るさ
 * @arialabel 月面にいる宇宙飛行士の白黒写真が黒で覆われています。マウスが照明の役割を果たし、写真上のマウス周辺が円形に照らされます。
 * @description Dan Shiffman によって作成されました。
 * このプログラムは、マウスから各ピクセルまでの距離を計算することで画像の一部の明るさを調整します。
 * <p><em><span class="small"> この例をローカルで実行するには、
 * 画像ファイルと稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em></p>
 */
let img;

function preload() {
  img = loadImage('assets/moonwalk.jpg');
}

function setup() {
  createCanvas(720, 200);
  pixelDensity(1);
  img.loadPixels();
  loadPixels();
}

function draw() {
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      // 2Dグリッドから1D位置を計算します。
      let loc = (x + y * img.width) * 4;
      // 画像からR,G,B値を取得します。
      let r, g, b;
      r = img.pixels[loc];
      // マウスの近さによって明るさを変える量を計算します。
      let maxdist = 50;
      let d = dist(x, y, mouseX, mouseY);
      let adjustbrightness = (255 * (maxdist - d)) / maxdist;
      r += adjustbrightness;
      // RGB が0〜255色の範囲に収まるように制限します。
      r = constrain(r, 0, 255);
      // 新しい色を生成し、画面上のピクセルをセットします。
      //color c = color(r, g, b);
      let pixloc = (y * width + x) * 4;
      pixels[pixloc] = r;
      pixels[pixloc + 1] = r;
      pixels[pixloc + 2] = r;
      pixels[pixloc + 3] = 255;
    }
  }
  updatePixels();
}
