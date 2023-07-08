/**
 * @name コンボリューションリバーブ
 * @arialabel ユーザーが画面をクリックするとリバーブ付きの音声が再生され、音声の振幅に応じてライムグリーンのバーが表示されます。
 * @description <p>p5.Convolverは、コンボリューションを使用して実際の
 * 空間の音を再現することができます。コンボリューションは、インパルス応答（部屋の反響音）を取り、
 * それを使用してその空間の音を再現します。</p>
 * <p>コンボリューションを通じて音を再生するにはクリックしてください。
 * クリックするごとに、音は異なるインパルス応答と積分されます。
 * インパルス応答自体を聴くには、
 * 任意のキーを押してください。</p>
 *
 * <p><em><span class="small">このサンプルをローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリ</a>、
 * 音声ファイル、および稼働中の <a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバ</a>が必要です。
 * These convolution samples are Creative Commons BY
 * <a href="https://www.freesound.org/people/recordinghopkins/">
 * recordinghopkins</a></em></span></p>
 */
let sound, env, cVerb, fft;
let currentIR = 0;
let rawImpulse;

function preload() {
  // すべてのインパルス／サウンドのMP3とOGGバージョンを収録しています。
  soundFormats('ogg', 'mp3');

  // p5.Convolverを作成します。
  cVerb = createConvolver('assets/bx-spring');

  // bx-spring に加えて、 cVerb.impulses 配列にインパルス応答を追加します。
  cVerb.addImpulse('assets/small-plate');
  cVerb.addImpulse('assets/drum');
  cVerb.addImpulse('assets/beatbox');
  cVerb.addImpulse('assets/concrete-tunnel');

  // p5.ConvultionReverb で処理される音声をロードします。
  sound = loadSound('assets/Damscray_DancingTiger');
}

function setup() {
  createCanvas(710, 400);
  rawImpulse = loadSound('assets/' + cVerb.impulses[currentIR].name);

  // マスター出力から切り離します。
  sound.disconnect();
  // ...そして、リバーブだけが聞こえるように
  // cVerbで処理します。
  cVerb.process(sound);

  fft = new p5.FFT();
}

function draw() {
  background(30);
  fill(0, 255, 40);

  let spectrum = fft.analyze();

  // frequencySpectrum配列のすべての値を矩形として描画します。
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }
}

function mousePressed() {
  // cVerb.impulsesの配列を循環させます。
  currentIR++;
  if (currentIR >= cVerb.impulses.length) {
    currentIR = 0;
  }
  cVerb.toggleImpulse(currentIR);

  // インパルスを通して音を再生します。
  sound.play();

  // 現在のインパルス応答の名前（ファイルパス）を表示します。
  println('Convolution Impulse Response: ' + cVerb.impulses[currentIR].name);

  rawImpulse.setPath('assets/' + cVerb.impulses[currentIR].name);
}

// インパルスを再生します（コンボリューションなし）
function keyPressed() {
  rawImpulse.play();
}
