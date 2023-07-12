/**
 * @name マイクのしきい値
 * @arialabel ユーザーの音声入力の振幅に応じて、バーの下部に黒い四角形が描かれます。ある最小振幅になると、画面右側に灰色の四角がランダムに描かれます。
 * @description <p>オーディオ入力のボリュームがしきい値を超えると
 * イベント（矩形を描く）がトリガーされます。</p>
 * <p><em><span class="small"> この例をローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.soundライブラリ</a>
 * および稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em></p>
 */
// Adapted from Learning Processing, Daniel Shiffman
// learningprocessing.com
let input;
let analyzer;

function setup() {
  createCanvas(710, 200);
  background(255);

  // オーディオ入力を作成します。
  input = new p5.AudioIn();

  input.start();
}

function draw() {
  // 全体のボリュームを取得します（ 0 から 1.0 の範囲）
  let volume = input.getLevel();

  // ボリュームが 0.1 より大きい場合は、ランダムな位置に矩形が描かれます。
  // ボリュームが大きいほど、長方形は大きくなります。
  let threshold = 0.1;
  if (volume > threshold) {
    stroke(0);
    fill(0, 100);
    rect(random(40, width), random(height), volume * 50, volume * 50);
  }

  // 全体の潜在的なボリュームをグラフにし、しきい値に線を引きます。
  let y = map(volume, 0, 1, height, 0);
  let ythreshold = map(threshold, 0, 1, height, 0);

  noStroke();
  fill(175);
  rect(0, 0, 20, height);
  // 次に、グラフ上にボリュームに応じた大きさの長方形を描きます。
  fill(0);
  rect(0, y, 20, y);
  stroke(0);
  line(0, ythreshold, 19, ythreshold);
}
