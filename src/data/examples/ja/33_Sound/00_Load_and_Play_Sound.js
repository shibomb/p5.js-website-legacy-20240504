/*
 * @name 音声のロードと再生
 * @arialabel ユーザーがクリックすると赤いスクリーンが緑色に変わり、音楽が再生されます。
 * @description preload() 内で音声をロードしてください。キャンバスがクリックされたときに音声を再生します。
 * <br><br><em><span class="small"> この例をローカルで実行するためには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリ</a>
 * 音声ファイル、および、稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em>
 */
let song;

function setup() {
  song = loadSound('assets/lucky_dragons_-_power_melody.mp3');
  createCanvas(720, 200);
  background(255, 0, 0);
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() はブール値を返します。
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}
