/**
 *  @name ノイズ・ドラム・エンベロープ
 *  @arialabel 画面をクリックすると、黒い画面の下からライムグリーンの四角形が立ち上がり、効果音が流れます。
 *  @description  <p>ホワイトノイズは、周波数スペクトルのすべての部分で
 *  等しいエネルギーを持つランダムなオーディオ信号です。</p>
 *
 *  <p>エンベロープとは、時間 / 値のペアとして定義される
 *  一連のフェードのことです。</p>
 *
 *  <p>このサンプルでは、p5.Env が p5.Noise をドラムのように「演奏」するために使用され、その出力
 *  振幅をコントロールします。
 *  p5.Amplitude はスケッチ内のすべてのサウンドのレベルを取得し、
 *  この値を使用して、
 *  アクション内でエンベロープを表す緑の四角形を描画します。</p>
 * <p><em><span class="small"> このサンプルをローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリ</a>と
 * サウンドファイルが必要です。</span></em></p>
 */
let noise, env, analyzer;

function setup() {
  createCanvas(710, 200);
  noise = new p5.Noise(); // 他に 'brown', 'pink' があります。
  noise.start();

  // ノイズ音量に 0 を掛けます。
  // (ノイス生成の準備が整うまでは静かにしておきましょう！）。
  noise.amp(0);

  env = new p5.Env();
  // attackTime, decayTime, sustainRatio, releaseTime を設定します。
  env.setADSR(0.001, 0.1, 0.2, 0.1);
  // attackLevel, releaseLevel を設定します。
  env.setRange(1, 0);

  // p5.Amplitude は、setInput() メソッドで入力を指定しない限り、
  // スケッチ内の全ての音声を分析します。
  analyzer = new p5.Amplitude();
}

function draw() {
  background(0);

  // p5.Amplitude アナライザーから音量を読み取ります。
  let level = analyzer.getLevel();

  // レベルを使用して緑色の四角形を描きます。
  let levelHeight = map(level, 0, 0.4, 0, height);
  fill(100, 250, 100);
  rect(0, height, width, -levelHeight);
}

function mousePressed() {
  env.play(noise);
}
