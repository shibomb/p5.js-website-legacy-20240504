/*
 * @name 音声のパン
 * @arialabel 黒い画面上で白いボールを動かし、クリックすると効果音が流れます。ボールがある側に近いスピーカーから音が出ます。
 * @description <p>マウスをクリックして音声を再生します。
 * ボールの位置はマウスに追従し、それに合わせて音声もパンニングされます。</p>
 * <p><em><span class="small"> この例をローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリ</a>、
 * 音声ファイル、および、稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em>
 *
 */
let ball = {};
let soundFile;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('assets/beatbox.ogg');
}

function setup() {
  createCanvas(710, 100);
}

function draw() {
  background(0);
  ball.x = constrain(mouseX, 0, width);
  ellipse(ball.x, height / 2, 100, 100);
}

function mousePressed() {
  // ボールの x 位置を
  // パン度数 -1.0 (左) から 1.0 (右) の範囲にマッピングします。
  let panning = map(ball.x, 0, width, -1.0, 1.0);
  soundFile.pan(panning);
  soundFile.play();
}
