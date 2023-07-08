/**
 *  @name 音符エンベロープ
 *  @arialabel 振幅と演奏された音符に基づき、スクリーンに赤いバーが浮かび上がります。
 *  @description <p>エンベロープとは、時間/値のペアとして定義される一連のフェードのことです。
 *  このサンプルでは、エンベロープはオシレーターの出力
 *  振幅を制御することで音符を"演奏"するために使用されます。<br/><br/>
 *  p5.Oscillator はその出力を
 *  内部の Web Audio GainNode (p5.Oscillator.output) に送ります。
 *  デフォルトでは、そのノードは 0.5 の定数値を持ちます。それは
 *  osc.amp() メソッドでリセットできます。また、このサンプルでは、
 *  エンベロープがそのノードを制御し、音量ノブのように振幅を
 *  上下します。</p>
 * <p><em><span class="small"> このサンプルをローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリ</a> と
 * 音声ファイルが必要です。</span></em></p>
 */
let osc, envelope, fft;

let scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
let note = 0;

function setup() {
  createCanvas(710, 200);
  osc = new p5.SinOsc();

  // エンベロープのインスタンス化
  envelope = new p5.Env();

  // attackTime, decayTime, sustainRatio, releaseTime を設定します。
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);

  // attackLevel、releaseLevelを設定します。
  envelope.setRange(1, 0);

  osc.start();

  fft = new p5.FFT();
  noStroke();
}

function draw() {
  background(20);

  if (frameCount % 60 === 0 || frameCount === 1) {
    let midiValue = scaleArray[note];
    let freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);

    envelope.play(osc, 0, 0.1);
    note = (note + 1) % scaleArray.length;
  }

  // FFT.analyze() による周波数分析をキャンバス上にプロットします。
  let spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length / 20; i++) {
    fill(spectrum[i], spectrum[i] / 10, 0);
    let x = map(i, 0, spectrum.length / 20, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height, spectrum.length / 20, -h);
  }
}
