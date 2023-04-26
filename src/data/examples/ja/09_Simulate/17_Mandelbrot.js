/*
 * @name マンデルブロ集合
 * @arialabel 小さな円盤が付属している一連のハート形の円盤に、大まかに似たフラクタル形状で連結した集合です
 * @description マンデルブロ集合のシンプルなレンダリング。
 * ProcessingのDaniel Shiffmanの<a href="https://processing.org/examples/mandelbrot.html">マンデルブロサンプル</a>をもとにしています。
 */

function setup() {
  createCanvas(710, 400);
  pixelDensity(1);
  noLoop();
}

function draw() {
  background(0);

  // 複素平面上の値の範囲を設定します。
  // 異なる範囲を設定すると、フラクタルの「ズームイン」または「ズームアウト」が可能になります。

  // 全部は幅で始まります、高い値または低い値を試してみてください。
  const w = 4;
  const h = (w * height) / width;

  // 幅と高さのマイナスハーフで始めます。
  const xmin = -w/2;
  const ymin = -h/2;

  // pixels[]配列に書き込めるようになっていることを確認してください。
  // 他に描画することがないため、一度だけ必要です。
  loadPixels();

  // 複素平面上の各点についての最大反復回数
  const maxiterations = 100;

  // xはxminからxmaxまで行きます。
  const xmax = xmin + w;
  // yはyminからymaxまで行きます。
  const ymax = ymin + h;

  // 画素ごとに、xとyをどのように増やすかを計算します。
  const dx = (xmax - xmin) / (width);
  const dy = (ymax - ymin) / (height);

  // yを開始します。
  let y = ymin;
  for (let j = 0; j < height; j++) {
    // xを開始します。
    let x = xmin;
    for (let i = 0; i < width; i++) {

      // テストすることになるのは、z＝z^2+cmで、zが無限に近づくかどうかですか？
      let a = x;
      let b = y;
      let n = 0;
      while (n < maxiterations) {
        const aa = a * a;
        const bb = b * b;
        const twoab = 2.0 * a * b;
        a = aa - bb + x;
        b = twoab + y;
        // 有限な世界の中の無限は簡単なもので、単にそれを16と考えることができます。
        if (dist(aa, bb, 0, 0) > 16) {
          break;  // 脱出する
        }
        n++;
      }

      // 各画素の色を、無限に到達するまでにかかった時間に基づいて塗りつぶします。
      // 到達しなかった場合は、黒を選びます。
      const pix = (i+j*width)*4;
      const norm = map(n, 0, maxiterations, 0, 1);
      let bright = map(sqrt(norm), 0, 1, 0, 255);
      if (n == maxiterations) {
        bright = 0;
      } else {
        // もしファンシーな色が欲しい場合は、ここでを作ることができます。
        pixels[pix + 0] = bright;
        pixels[pix + 1] = bright;
        pixels[pix + 2] = bright;
        pixels[pix + 3] = 255;
      }
      x += dx;
    }
    y += dy;
  }
  updatePixels();
}
