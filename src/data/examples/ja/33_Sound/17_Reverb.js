/**
 *  @name リバーブ
 *  @arialabel ユーザーが黒い画面をクリックすると、リバーブ付きの音声が再生されます。
 *  @description リバーブは音に深みと知覚される空間を与えます。 ここでは、
 *  ノイズがリバーブで処理されます。
 *
 * <p><em><span class="small"> この例をローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリ</a>、
 * 音声ファイル、および稼働中の <a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em></p>
 */
let sound, reverb;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('assets/Damscray_DancingTiger');

  // デフォルトの接続を切断します。
  // そうすることで、リバーブ経由の音声だけを聴くことができます。
  soundFile.disconnect();
}

function setup() {
  createCanvas(720, 100);
  background(0);

  reverb = new p5.Reverb();

  // reverbTime を 6秒、decayRate を 0.2%として、
  // 音声ファイルにリバーブに接続します。
  reverb.process(soundFile, 6, 0.2);

  reverb.amp(4); // ボリュームを上げましょう！
}

function mousePressed() {
  soundFile.play();
}
