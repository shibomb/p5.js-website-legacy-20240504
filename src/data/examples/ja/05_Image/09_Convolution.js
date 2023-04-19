/*
* @name 畳み込み(Convolution)
* @arialabel 背景に宇宙飛行士の画像を表示し、ユーザーのマウスが動くにつれ画像の鮮明度を上げる正方形のセクションも動きます。
* @description 画像の一部に畳み込み行列を適用します。マウスを移動させると、異なる部分にフィルタを適用できます。この例はProcessing用に<a href="https://processing.org/examples/convolution.html" target="blank">Dan Shiffmanの例</a>を移植したものです。ソース中のコメントはDanによって書かれたものを翻訳しています。
* <p><em><span class="small">この例をローカルで実行するには、画像ファイルと<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバ</a>が必要です。</span></em></p>
*/
 
let img;
let w = 80;

// 多数の畳み込み行列で画像を畳み込むことで、さまざまな効果を生み出すことができます。
// これはハイパスフィルタで、エッジを強調します。
const matrix = [ [ -1, -1, -1 ],
                 [ -1,  9, -1 ],
                 [ -1, -1, -1 ] ]; 

function preload() {
  img = loadImage('assets/moonwalk.jpg');
}

function setup() {
  createCanvas(720, 400);
  img.loadPixels();

  // pixelDensity(1) はピクセル密度を表示密度にスケーリングしないためのものです。
  // 詳細については、pixelDensity()のリファレンスを参照してください。
  pixelDensity(1);
}

function draw() {
  // 画像の一部分だけを処理する予定なので、まずは全体を背景として設定しましょう。
  background(img);

  // 処理をする範囲の小さな矩形を計算します。
  const xstart = constrain(mouseX - w/2, 0, img.width);
  const ystart = constrain(mouseY - w/2, 0, img.height);
  const xend = constrain(mouseX + w/2, 0, img.width);
  const yend = constrain(mouseY + w/2, 0, img.height);
  const matrixsize = 3;

  loadPixels();
  // 範囲内のすべてのピクセルに対してループを開始します。
  for (let x = xstart; x < xend; x++) {
    for (let y = ystart; y < yend; y++ ) {
      let c = convolution(x, y, matrix, matrixsize, img);
      
      // 変数 c からRGBAの値を取得して、pixels()を更新します。
      let loc = (x + y*img.width) * 4;
      pixels[loc] = red(c);
      pixels[loc + 1] = green(c);
      pixels[loc + 2] = blue(c);
      pixels[loc + 3] = alpha(c);
    }
  }
  updatePixels();
}

function convolution(x, y, matrix, matrixsize, img) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  const offset = Math.floor(matrixsize / 2);
  for (let i = 0; i < matrixsize; i++){
    for (let j = 0; j < matrixsize; j++){
      
      // 検査するピクセル
      const xloc = (x + i - offset);
      const yloc = (y + j - offset);
      let loc = (xloc + img.width * yloc) * 4;

      // 画像から外れていないことを確認しています。 we could do better here
      loc = constrain(loc, 0 , img.pixels.length - 1);

      // 畳み込みの計算
      // RGB値を取得
      rtotal += (img.pixels[loc]) * matrix[i][j];
      gtotal += (img.pixels[loc + 1]) * matrix[i][j];
      btotal += (img.pixels[loc + 2]) * matrix[i][j];
    }
  }
  // RGBが0~255に収まっていることを確認しています。
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  
  // 畳み込みをした色を返す
  return color(rtotal, gtotal, btotal);
} 