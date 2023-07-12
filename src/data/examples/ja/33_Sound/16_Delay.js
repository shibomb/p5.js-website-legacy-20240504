/**
 *  @name ディレイ
 *  @arialabel ユーザーが黒い画面上でマウスをクリックすると音楽が再生され、再生される音の振幅に対応した高さで、下からライムグリーンの四角形が現れます。
 *  @description
 *  マウスをクリックすると、p5.Delay が音声ファイルを処理するのが聞こえます。
 *  MouseX は p5.Delayフィルター周波数を制御します。
 *  MouseY は p5.Delay時間とレゾナンスを共に制御します。
 *  振幅オブジェクトで結果として得られる音のボリュームを視覚化します。
 *
 * <p><em><span class="small"> この例をローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.soundライブラリ</a>、
 * 音声ファイル、および稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em></p>
 */

let soundFile, analyzer, delay;

function preload() {
  soundFormats('ogg', 'mp3');
  soundFile = loadSound('assets/beatbox.mp3');
}

function setup() {
  createCanvas(710, 400);

  soundFile.disconnect(); // ディレイだけが聞こえます。

  delay = new p5.Delay();
  delay.process(soundFile, 0.12, 0.7, 2300);
  delay.setType('pingPong'); // ステレオ効果

  analyzer = new p5.Amplitude();
}

function draw() {
  background(0);

  // p5.Amplitudeアナライザーからボリュームを読み取ります。
  let level = analyzer.getLevel();

  // レベルを使用して緑色の四角形を描きます。
  let levelHeight = map(level, 0, 0.1, 0, height);
  fill(100, 250, 100);
  rect(0, height, width, -levelHeight);

  let filterFreq = map(mouseX, 0, width, 60, 15000);
  filterFreq = constrain(filterFreq, 60, 15000);
  let filterRes = map(mouseY, 0, height, 3, 0.01);
  filterRes = constrain(filterRes, 0.01, 3);
  delay.filter(filterFreq, filterRes);
  let delTime = map(mouseY, 0, width, 0.2, 0.01);
  delTime = constrain(delTime, 0.01, 0.2);
  delay.delayTime(delTime);
}

function mousePressed() {
  soundFile.play();
}
