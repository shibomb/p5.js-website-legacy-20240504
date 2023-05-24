/*
 * @name マンデルブロ集合
 * @arialabel ハート型の円盤が連なったようなフラクタル。円盤に小さな円盤がくっつき、連結した集合からなります。
 * @description マンデルブロ集合のシンプルなレンダリングを行います。
 * Processing の Daniel Shiffman の <a href="https://processing.org/examples/mandelbrot.html">マンデルブロサンプル</a> をもとにしています。
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

  // すべては幅から始まります、高い値または低い値を試してみてください。
  const w = 4;
  const h = (w * height) / width;

  // 幅と高さのマイナスハーフで始めます。
  const xmin = -w/2;
  const ymin = -h/2;

  // pixels[] 配列に書き込めるようになっていることを確認してください。
  // 他に描画することがないため、一度だけ必要です。
  loadPixels();

  // 複素平面上の各点についての最大反復回数
  const maxiterations = 100;

  // x は xmin から xmax まで増加します。
  const xmax = xmin + w;
  // y は ymin から ymax まで増加します。
  const ymax = ymin + h;

  // 画素ごとに、x と y をどのように増やすかを計算します。
  const dx = (xmax - xmin) / (width);
  const dy = (ymax - ymin) / (height);

  // y を開始します。
  let y = ymin;
  for (let j = 0; j < height; j++) {
    // x を開始します。
    let x = xmin;
    for (let i = 0; i < width; i++) {

      // テストすることになるのは、z＝z^2+cm を繰り返すうちに、z が無限に近づくかどうかです。
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
          break;  // 脱出します。
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
        // もしファンシーな色が欲しい場合は、ここで作ることができます。
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
