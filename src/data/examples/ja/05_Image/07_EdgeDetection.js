/*
* @name エッジ検出
* @arialabel 左側に白黒でレンダリングされた宇宙飛行士、右側には画像を高度にシャープ化したバージョンが表示されています
* @description ハイパスフィルターにより画像をシャープ化します。このプログラムは、隣接するピクセルとの関係で画像内のすべてのピクセルを解析して、画像をシャープ化します。
* <br><br><span class="small"><em>この例は、Processingウェブサイトの<a href="https://processing.org/examples/edgedetection.html">エッジ検出の例</a>から移植されたものです。</em></span>
*/
// このプログラムは、隣接するピクセルとの関係で画像内のすべてのピクセルを解析して、画像をシャープ化します

// 全ての隣接するピクセルを考慮するために、3x3の配列を使用し、これらの値を正規化します
// カーネルは、正規化された値の3x3行列です
let kernel = [[-1, -1, -1 ], [ -1,  9, -1 ], [-1, -1, -1 ]]; 

// preload()はsetup()の前に1回だけ実行されます
// loadImage()はsetup()で呼び出すのではなく、ここで実行する必要があります
// setup()でloadImage()を呼び出すと、noLoop()によりdraw()が1回しか実行されないため、
// 画像が表示されません(1回のdraw()では画像をロードするための十分な時間がありません)。
// preload()は、他の処理が実行される前に画像がロードされることを保証します
function preload() {
  // オリジナルの画像を読み込む
  img = loadImage("assets/rover.png"); 
}

// setup()はpreload()の後に1回実行されます
function setup() {
  // キャンバスを作成する
  createCanvas(710, 400);
  // noLoop()はdraw()を1回のみ実行し、ループしないようにします
  noLoop();
}

// draw()は通常、setup()の後にループ実行されます
// 今回はnoLoop()のため1回だけ実行されます
function draw() {
  
  // オリジナルの画像を左上隅に配置する
  image(img, 0, 0);

  // imgと同じ寸法の新しい画像を作成する
  edgeImg = createImage(img.width, img.height);
  
  // 画像のピクセルを読み込む
  edgeImg.loadPixels();
  
  // x軸とy軸を反復処理するための2つのfor()ループ
  // カーネルは、ピクセルが上下左右にピクセルを持っていることを前提としているため、
  // 最初の列と行、最後の列と行をスキップする必要があります
  // xは1から画像の幅-1までになります
  // yは1から画像の高さ-1までになります
  for (let x = 1; x < img.width - 1; x++) {
    for (let y = 1; y < img.height - 1; y++) {
      // 現在のピクセルのカーネルの合計は0から始まります
      let sum = 0; 
      
      // カーネルを反復処理するためのkx、ky変数
      // kx、kyには3つの異なる値があります：-1、0、1
      for (kx = -1; kx <= 1; kx++) {
        for (ky = -1; ky <= 1; ky++) {
          
          let xpos = x + kx;
          let ypos = y + ky;
          let pos = (y + ky)*img.width + (x + kx);
          // 画像がグレースケールであるため、
          // RGB値は同じです
          // この例では赤の値を取得します
          let val = red(img.get(xpos, ypos));
          // カーネルの合計を蓄積する
          // カーネルは3x3の行列です
          // kxとkyには-1、0、1の値があります
          // kxとkyに1を加えると、0、1、2が得られます
          // それを使用してカーネルを反復処理し、
          // 累積和を計算できます
          sum += kernel[ky+1][kx+1] * val;
        }
      }
      
      // edgeImgのピクセル値を設定します
      edgeImg.set(x, y, color(sum, sum, sum));
    }
  }
  
  // edgeImgの変更を書き込みます
  edgeImg.updatePixels();
  
  // 元の画像の右にedgeImg（エッジ検出した画像）を描画します
  image(edgeImg, img.width, 0);
}