/*
 * @name 再生速度
 * @arialabel 薄い灰色の背景に、2つの灰色の円が描かれ、ユーザーがマウスを動かすと動き、互いの距離に応じて異なるノイズを再生します。
 * @description <p>音声ファイルをロードし、その再生速度を mouseY に、
 * 音量を mouseX にマッピングします。
 * 再生速度は、ウェブオーディオコンテキストが音声ファイル情報を処理する速さです。
 * より遅い速度は、音の持続時間を増加させるだけでなく、ピッチも低下させます。
 * なぜなら、それはより遅い周波数で再生されているからです。</p>
 * <p><em><span class="small"> この例をローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.soundライブラリ</a>、
 * 音声ファイル、および、稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em>
 */
// 音声ファイルオブジェクト
let song;

function preload() {
  // 音声ファイルをロードします。
  song = loadSound('assets/Damscray_DancingTiger.mp3');
}

function setup() {
  createCanvas(710, 400);

  // 音声を永遠にループします。
  // (stop() が呼ばれるまで。)
  song.loop();
}

function draw() {
  background(200);

  // 音量を 0 から 1.0 の範囲で設定します。
  let volume = map(mouseX, 0, width, 0, 1);
  volume = constrain(volume, 0, 1);
  song.amp(volume);

  // 速度を 0.1　から 4 の範囲で設定します。
  // 速度を変えるとピッチが変わります。
  let speed = map(mouseY, 0.1, height, 0, 2);
  speed = constrain(speed, 0.01, 4);
  song.rate(speed);

  // 何が起こっているかを示すために円を描きます。
  stroke(0);
  fill(51, 100);
  ellipse(mouseX, 100, 48, 48);
  stroke(0);
  fill(51, 100);
  ellipse(100, mouseY, 48, 48);
}
