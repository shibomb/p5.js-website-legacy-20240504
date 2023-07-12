/*
 * @name 音声ファイルのプリロード
 * @arialabel ページがロードされると、緑色のスクリーンで音楽が再生されます。ユーザーがクリックすると、画面が赤くなり、音楽の再生が止まります。
 * @description setup()が呼び出される前に音声のロードを完了するために、preload() 内で loadSound() を呼び出してください。
 * 常に preload() 内で loadSound() を呼び出すことが最善です。
 * そうしないと、スケッチで再生したい時点で、
 * 音声のロードが完了していない可能性があります。
 *
 * <br><br><em><span class="small"> この例をローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリー</a>、
 * 音声ファイル、および、稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em>
 */

let song;

function preload() {
  song = loadSound('assets/lucky_dragons_-_power_melody.mp3');
}

function setup() {
  createCanvas(710, 200);
  song.loop(); // 曲は preload 内でロードされたので、setup() で再生する準備ができています。
  background(0, 255, 0);
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() はブール値を返します。
    song.pause(); // .play() は .pause() の位置から再開します。
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}
