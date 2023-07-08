/*
 * @name 発振周波数
 * @arialabel 波長はスクリーンを横切り、ユーザーのマウスが左に移動するにつれて波長は長く、周波数は遅くなり、マウスが右に移動するにつれて両方とも増加します。
 * @description <p>オシレーターを制御し、FFTを使用して波形を表示します。
 * MouseX は周波数に、MouseY は振幅にマッピングされています。</p>
 * <p><em><span class="small"> このサンプルをローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.soundライブラリ</a>と
 * サウンドファイルが必要です。</span></em></p>
 */
let osc, fft;

function setup() {
  createCanvas(720, 256);

  osc = new p5.TriOsc(); // 周波数とタイプを設定します。
  osc.amp(0.5);

  fft = new p5.FFT();
  osc.start();
}

function draw() {
  background(255);

  let waveform = fft.waveform(); // 波形を分析します。
  beginShape();
  strokeWeight(5);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();

  // mouseX に基づいてオシレーターの周波数を変更します。
  let freq = map(mouseX, 0, width, 40, 880);
  osc.freq(freq);

  let amp = map(mouseY, 0, height, 1, 0.01);
  osc.amp(amp);
}
