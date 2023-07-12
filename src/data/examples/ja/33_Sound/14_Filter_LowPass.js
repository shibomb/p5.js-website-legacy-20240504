/**
 *  @name ローパスフィルター
 *  @arialabel ローパスフィルターは、ユーザーのマウスが画面上で左右に動くと強度が変化します。
 *  @description p5.SoundFile に p5.LowPass フィルタを適用します。
 *  FFT を用いて音を視覚化します。
 *  mouseX をフィルターのカットオフ周波数に、
 *  mouseY を BandPass フィルターの共振/幅にマップします。
 *
 * <p><em><span class="small"> この例をローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.soundライブラリ</a>、
 * 音声ファイル、および稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバ</a>が必要です。</span></em></p>
 */
let soundFile;
let fft;

let filter, filterFreq, filterRes;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('assets/beat');
}

function setup() {
  createCanvas(710, 256);
  fill(255, 40, 255);

  // 音声ファイルをループさせます。
  soundFile.loop();

  filter = new p5.LowPass();

  // マスター出力から音声ファイルを切り離します。
  // そして、フィルターに接続し、フィルターにかけられた音だけが聞こえるようにします。
  soundFile.disconnect();
  soundFile.connect(filter);

  fft = new p5.FFT();
}

function draw() {
  background(30);

  // mouseX を、人間が聞き取れる最低周波数（10Hz）から最高周波数（22050Hz）までの
  // カットオフ周波数に対応させます。
  filterFreq = map(mouseX, 0, width, 10, 22050);

  // mouseY をカットオフ周波数のレゾナンス（ボリューム・ブースト）にマッピングします。
  filterRes = map(mouseY, 0, height, 15, 5);

  // フィルター・パラメーターを設定します。
  filter.set(filterFreq, filterRes);

  // FFTスペクトル分析で、次の各値を描画します。
  // x = 最低周波数（10Hz）から 最高周波数（22050Hz）まで
  // h = その周波数における エネルギー（振幅 / ボリューム）
  let spectrum = fft.analyze();
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }
}
