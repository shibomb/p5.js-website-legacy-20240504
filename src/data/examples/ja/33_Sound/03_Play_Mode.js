/*
 * @name プレイモード
 * @arialabel 黄色い画面をクリックすると音楽が流れます。
 * @description
 * <p>'sustain' モードでは、サウンドが自分自身と重なって鳴ります。
 * 'restart' モードでは、一度停止してから再びスタートします。
 * マウスをクリックして音声ファイルを再生します。
 * たくさんのサウンドを一挙に再生します！任意のキーを押すと再生モードが切り替わります。</p>
 * <p><em><span class="small"> このサンプルをローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.soundライブラリ</a>、
 * 音声ファイル、および、稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em>
 */
let playMode = 'sustain';
let sample;

function setup() {
  createCanvas(710, 50);
  soundFormats('mp3', 'ogg');
  sample = loadSound('assets/Damscray_-_Dancing_Tiger_02.mp3');
}

function draw() {
  background(255, 255, 0);
  let str = 'Click here to play! Press key to toggle play mode.';
  str += ' Current Play Mode: ' + playMode + '.';
  text(str, 10, height / 2);
}

function mouseClicked() {
  sample.play();
}
function keyPressed(k) {
  togglePlayMode();
}

function togglePlayMode() {
  if (playMode === 'sustain') {
    playMode = 'restart';
  } else {
    playMode = 'sustain';
  }
  sample.playMode(playMode);
}
