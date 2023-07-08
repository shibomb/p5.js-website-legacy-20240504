/**
 *  @name バンドパスフィルター
 *  @arialabel マウスが画面上を左右に動くと、バンドパスフィルターの強度が変化します。
 *  @description ホワイトノイズに p5.BandPass フィルタを適用します。
 *  FFTで音を視覚化します。
 *  mouseX をバンドパス周波数に、
 *  mouseY をバンドパスフィルタのレゾナンス/幅にマッピングします。
 *
 * <p><em><span class="small"> このサンプルをローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリ</a>、
 * 音声ファイル、そして稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバ</a>が必要です。</span></em></p>
 */
let noise;
let fft;
let filter, filterFreq, filterWidth;

function setup() {
  createCanvas(710, 256);
  fill(255, 40, 255);

  filter = new p5.BandPass();

  noise = new p5.Noise();

  noise.disconnect(); // マスター出力から音声ファイルを切り離す...
  filter.process(noise); // ...そしてフィルターに接続し、バンドパスだけを聴けるようにします。
  noise.start();

  fft = new p5.FFT();
}

function draw() {
  background(30);

  // FFTスペクトル範囲から mouseX をバンドパス周波数にマッピングします： 10Hz - 22050Hz
  filterFreq = map(mouseX, 0, width, 10, 22050);
  // mouseY を 共鳴 / 幅 にマッピングします。
  filterWidth = map(mouseY, 0, height, 0, 90);
  // フィルター・パラメーターを設定します。
  filter.set(filterFreq, filterWidth);

  // FFTスペクトル分析で、次の各値を描画します。
  // x = 最低周波数（10Hz）から 最高周波数（22050Hz）まで
  // h = その周波数における エネルギー / 振幅
  let spectrum = fft.analyze();
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }
}
