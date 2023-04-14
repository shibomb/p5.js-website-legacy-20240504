/*
* @name 明度(Brightness)
* @arialabel 白黒で描かれた宇宙飛行士のイメージに黒いスクリーンがかかります。ユーザーのマウスが懐中電灯のように機能し、マウスを動かすことで画像の一部分が照らされます。
* @description このプログラムは、各ピクセルとマウスとの距離を計算して、画像の一部の明るさを調整します。
* <br><br><span class="small"><em>この例はProcessingウェブサイトの<a href="https://processing.org/examples/brightness.html">Brightness example</a>を移植したものです。</em></span>
*/
// このプログラムは、各ピクセルとマウスとの距離を計算して、
// 画像の一部の明るさを調整します。
let img;
// preload()はsetup()の前に1回実行されます。
// loadImage()は、setup()ではなくここで実行する必要があります。
// preload()は、他の処理が実行される前に画像が読み込まれることを保証します。
function preload() {
  // オリジナルの画像を読み込む。
  img = loadImage("assets/rover_wide.jpg");  
}
// setup()はpreload()の後に1回実行されます。
function setup() {
  createCanvas(710, 400);
  pixelDensity(1);
  frameRate(30);
}

function draw() {
    image(img,0,0);
    // pixels[]配列をロードする必要があるのは1回だけです。
    // なぜなら形状を描くのではなく、draw()内でpixels[]を操作するためだからです。
    loadPixels();
    // この画像のピクセルを読み取るためにloadPixels()を呼び出す必要があります。
    img.loadPixels();
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++ ) {
        // 2Dグリッドから1Dの位置を計算する
        let loc = (x + y*img.width)*4;
        // 画像からR、G、Bの値を取得する（今回はRのみ）
        let r,g,b;
        r = img.pixels[loc];
        // g = img.pixels[loc+1];
        // b = img.pixels[loc+2];
        // マウスに近い距離に基づいて明るさを変更する量を計算する
        // ピクセルがマウスに近いほど、「distance」の値が低くなります
        let maxdist = 50;//dist(0,0,width,height);
        let d = dist(x, y, mouseX, mouseY);
        let adjustbrightness = 255*(maxdist-d)/maxdist;
        r += adjustbrightness;
        // g += adjustbrightness;
        // b += adjustbrightness;
        // Rが0-255のカラー範囲内に収まるように設定する
        r = constrain(r, 0, 255);
        // g = constrain(g, 0, 255);
        // b = constrain(b, 0, 255);
        // 新しい色を作成して、ウィンドウ内のピクセルを設定する
        let pixloc = (y*width + x)*4;
        pixels[pixloc] = r;
        pixels[pixloc+1] = r;
        pixels[pixloc+2] = r;
        pixels[pixloc+3] = 255; // アルファ値は255固定
        }
    }
    updatePixels();
}