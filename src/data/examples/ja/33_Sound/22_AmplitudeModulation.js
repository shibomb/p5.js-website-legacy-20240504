/**
 * @name 振幅変調
 * @arialabel 黒い背景の上で、白い音波はユーザーがマウスを動かすと変化します。モジュレーターの周波数と振幅のラベルも、ユーザーがマウスを動かすと変化します。
 * @description <p>振幅変調は、キャリアとモジュレーターと
 * 呼ばれる2つのオシレーターを使用し、
 * モジュレーターがキャリアの振幅を制御します。</p>
 *
 * <p>キャリアは通常、可聴周波数（つまり、440 Hz）に設定され、デフォルトでマスター出力に接続されます。
 * キャリアのアンプは
 * モジュレーターがその振幅を制御するため、0に設定されます。</p>
 *
 * <p>モジュレーターはマスター出力から切断されます。
 * 代わりに、キャリアの振幅に接続され、このようになります：carrier.amp(modulator) </p>
 *
 * <p>この例では...</p>
 * <p>- MouseX はモジュレーターの振幅を 0 から 1 まで制御します。
 * モジュレーターの振幅が 0 に設定されると、
 * 振幅変調は効果がありません。</p>
 *
 * <p>- MouseY はモジュレーターの周波数を 0 から 20 hz まで制御します。
 * これは人間が聴くことのできる周波数よりも低い範囲で、私たちは
 * 変調をリズムとして認識します。
 * この範囲は、トレモロなどの効果を模倣することができます。
 * リング変調は振幅変調の一種で、元のキャリア信号が存在せず、多くの場合、
 * より高速な周波数での変調が含まれます。 </p>
 *
 * <p><em><span class="small">この例を自分のプロジェクトで動作させるには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.soundライブラリ</a>
 * を含める必要があります。</em></span></p>
 */
let carrier; // これがこれから聴くオシレーターです。
let modulator; // このオシレーターはキャリアの振幅を変調します。
let fft; // 波形を視覚化します。

function setup() {
  createCanvas(800, 400);
  noFill();
  background(30); // アルファ

  carrier = new p5.Oscillator(); // デフォルトでマスター出力に接続します。
  carrier.freq(340);
  carrier.amp(0);
  // キャリアのアンプはデフォルトで0なので、モジュレーターは完全にコントロールできます。

  carrier.start();

  modulator = new p5.Oscillator('triangle');
  modulator.disconnect(); // モジュレーターをマスター出力から切り離します。
  modulator.freq(5);
  modulator.amp(1);
  modulator.start();

  // モジュレーターでキャリアの振幅を変調します。
  // オプションで、信号をスケーリングすることもできます。
  carrier.amp(modulator.scale(-1, 1, 1, -1));

  // オーディオを分析するためにFFTを作成します。
  fft = new p5.FFT();
}

function draw() {
  background(30, 30, 30, 100); // アルファ

  // mouseY を 0 から 20 hz の範囲のモジュレーターの周波数にマッピングします。
  let modFreq = map(mouseY, 0, height, 20, 0);
  modulator.freq(modFreq);

  let modAmp = map(mouseX, 0, width, 0, 1);
  modulator.amp(modAmp, 0.01); // スムーズなフェーディングのために、フェードタイムを 0.1 にします。

  // 波形を分析します。
  waveform = fft.waveform();

  // 波形の形を描きます。
  drawWaveform();

  drawText(modFreq, modAmp);
}

function drawWaveform() {
  stroke(240);
  strokeWeight(4);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, -height / 2, height / 2);
    vertex(x, y + height / 2);
  }
  endShape();
}

function drawText(modFreq, modAmp) {
  strokeWeight(1);
  text('Modulator Frequency: ' + modFreq.toFixed(3) + ' Hz', 20, 20);
  text('Modulator Amplitude: ' + modAmp.toFixed(3), 20, 40);
}
