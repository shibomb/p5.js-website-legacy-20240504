/**
 * @name 音声の録音保存
 * @arialabel ユーザーの灰色の画面をクリックし、マイクから入力された音声の録音を開始します。録音中は画面が赤くなります。録音を終了するには、もう一度マウスをクリックし、画面が緑色に変わります。ユーザーがもう一度マウスをクリックすると、録音した音声をファイルに保存し、wavファイルとしてダウンロードされます。
 * @description 音声を録音し、再生して、クライアントのコンピューターに .wav ファイルとして保存します。
 * 3つのオブジェクトが必要です:
 * p5.AudioIn（マイク / 音源）、
 * p5.SoundRecorder（音声を記録）、
 * p5.SoundFile（再生 / 保存）。
 * <p><em><span class="small"> この例をローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリ</a>、
 * 音声ファイル、および稼働中の <a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em></p>
 */
let mic, recorder, soundFile;

let state = 0; // mousePress で、録音、停止、再生が切り替わります。

function setup() {
  createCanvas(400, 400);
  background(200);
  fill(0);
  text('Enable mic and click the mouse to begin recording', 20, 20);

  // 音声入力を作成します。
  mic = new p5.AudioIn();

  // 録音を正しく行うには、ブラウザのマイクを手動で有効にする必要があります！
  mic.start();

  // 音声レコーダーを作ります。
  recorder = new p5.SoundRecorder();

  // マイクをレコーダーに接続します。
  recorder.setInput(mic);

  // 録音を再生するために使用する空の音声ファイルを作成します。
  soundFile = new p5.SoundFile();
}

function mousePressed() {
  // '.enabled' ブール値を使用して、ユーザーがマイクを有効にしていることを確認します（そうでなければ無音で録音します）。
  if (state === 0 && mic.enabled) {
    // 再生に使用する p5.SoundFile に録音するようレコーダーに指示します。
    recorder.record(soundFile);

    background(255, 0, 0);
    text('Recording now! Click to stop.', 20, 20);
    state++;
  } else if (state === 1) {
    recorder.stop(); // レコーダーを停止し、結果を音声ファイルに送ります。

    background(0, 255, 0);
    text('Recording stopped. Click to play & save', 20, 20);
    state++;
  } else if (state === 2) {
    soundFile.play(); // 結果を再生します！
    saveSound(soundFile, 'mySound.wav'); // ファイルに保存します。
    state++;
  }
}
