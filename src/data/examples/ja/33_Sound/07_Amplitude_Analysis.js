/**
 * @name 振幅の測定
 * @arialabel 演奏している音楽の振幅に応じて、灰色の円が大きさが増減します。
 * @description <p>p5.Amplitude
 * で音の振幅を分析します。</p>
 *
 *  <p><b>振幅</b>は振動の大きさです。音は振動なので、
 *  その振幅はボリューム/ラウドネスと密接に関係しています。</p>
 *
 * <p><code>getLevel()</code>メソッドは、
 * 小さな期間（1024サンプル）にわたって収集された振幅値の配列を取り、
 * それらの値の<b>二乗平均平方根(RMS)</b>を返します。</p>
 *
 * <p>デジタルオーディオの元の振幅値は -1.0 から 1.0 の範囲です。
 * しかし、RMSは平方(２乗)されているので常に正の値になります。
 * そして、1秒間に44,100回の割合でサンプリングされた瞬間的な振幅測定値ではなく、
 * RMSは時間（この場合は1024サンプル）の平均値であり、
 * 振幅の聞こえ方をよりよく表しています。
 * </p>
 * <p><em><span class="small"> この例をローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリ</a>、
 * 音声ファイル、および、稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em>
 */
let song, analyzer;

function preload() {
  song = loadSound('assets/lucky_dragons_-_power_melody.mp3');
}

function setup() {
  createCanvas(710, 200);
  song.loop();

  // 新しい振幅アナライザを作成します。
  analyzer = new p5.Amplitude();

  // 入力をボリュームアナライザーに割り当てます。
  analyzer.setInput(song);
}

function draw() {
  background(255);

  // 平均振幅（二乗平均平方根）を取得します。
  let rms = analyzer.getLevel();
  fill(127);
  stroke(0);

  // ボリュームに応じた大きさの楕円を描きます。
  ellipse(width / 2, height / 2, 10 + rms * 200, 10 + rms * 200);
}
