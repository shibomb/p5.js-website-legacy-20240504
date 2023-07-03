/*
 * @name ビデオ
 * @arialabel 指で歩く映像です。
 * @frame 710,250
 * @description 複数のフォーマットでビデオをロードし、ボタンを押すことで
 * 再生と一時停止を切り替えます。
 */
let playing = false;
let fingers;
let button;

function setup() {
  noCanvas();
  // 異なるブラウザ用に複数のフォーマットを指定します。
  fingers = createVideo(['assets/fingers.mov', 'assets/fingers.webm']);
  button = createButton('play');
  button.mousePressed(toggleVid); // ボタンリスナーをアタッチします。
}

// 現在の状態に応じてビデオを再生または一時停止します。
function toggleVid() {
  if (playing) {
    fingers.pause();
    button.html('play');
  } else {
    fingers.loop();
    button.html('pause');
  }
  playing = !playing;
}
