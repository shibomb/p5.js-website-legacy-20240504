/**
 * @name マイク入力
 * @arialabel ユーザーがマイクに入力した音声の振幅に応じて、画面下部からグレーの円が上昇します。
 * @description <p>コンピュータのマイクから音声入力を取得します。
 * 楕円を浮き上がらせるノイズを作ります。</p>
 * <p>注：p5.AudioIn は独自の p5.Amplitude オブジェクトを含んでいるため、
 * p5.Amplitude を作成せずに p5.AudioIn で
 * getLevel を呼び出すことができます。</p>
 * <p><em><span class="small"> このサンプルをローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリ</a>
 * と稼働している<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em></p>
 */
let mic;

function setup() {
  createCanvas(710, 200);

  // オーディオ入力を作成します。
  mic = new p5.AudioIn();

  // オーディオ入力を開始します。
  // デフォルトでは、（コンピューターのスピーカーに） .connect() しません。
  mic.start();
}

function draw() {
  background(200);

  // 全体のボリュームを取得します。（0 から 1.0 の範囲）
  let vol = mic.getLevel();
  fill(127);
  stroke(0);

  // ボリュームに応じた高さの楕円を描きます。
  let h = map(vol, 0, 1, height, 0);
  ellipse(width / 2, h - 25, 50, 50);
}
