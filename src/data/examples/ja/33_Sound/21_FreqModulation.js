/**
 * @name 周波数変調
 * @arialabel 黒い背景の上で、白い音波はユーザーがマウスを動かすと変化します。モジュレーターの周波数と振幅のラベルも、ユーザーがマウスを動かすと変化します。220Hzのキャリア周波数のラベルも表示されています。
 * @description <p>周波数変調は、強力な合成の一形態です。
 * 最も単純な形式では、 FM はキャリアとモジュレーターと呼ばれる
 * 2つのオシレーターを含みます。モジュレーターの波形が最小振幅と最大振幅の
 * 間で振動すると、その一時的な値がキャリアの周波数に加えられ（「変調」され）ます。</p>
 * <p>通常、<b>キャリア</b>は人間がピッチとして認識する聴覚周波数で
 * 振動するように設定されています—この場合、それは 220 Hz での正弦波オシレーターであり、
 * "A3" の音に相当します。キャリアはデフォルトでマスター出力に接続されています
 * （すべての p5.Oscillator でそうなります）。</p>
 * <p><b>モジュレーター</b>をマスター出力から<code>切断</code>し、
 * 代わりにキャリアの周波数に接続します：
 * <code>carrier.freq(modulator)</code>。
 * これにより、モジュレーターの出力振幅が
 * キャリアの周波数に加えられます。</p>
 * <p>
 * <b>変調深度</b>はキャリア周波数がどの程度変調するかを記述します。
 * これはモジュレーターの振幅に基づいています。
 * モジュレーターは連続した振幅値のストリームを生み出し、
 * それをキャリア周波数に加えます。
 * 振幅はゼロということは音がないということなので、変調は影響を及ぼしません。
 * 振幅が 1.0 の場合、出力値の範囲は +1.0 から -1.0 までとなります。
 * これはスピーカに送られる音の標準的な範囲ですが、
 * FMでは代わりにモジュレーターの出力をキャリア周波数に送っています。
 * そのため、+1Hz / -1Hz の変調はほとんど気づかないでしょう。
 * したがって、通常はモジュレーターの振幅（「深さ」）をスピーカに送る数値よりもはるかに大きくします。</p>
 * <p><b>変調周波数</b>は変調の速度です。
 * 変調周波数が 20Hz 以下の場合、人間はその周波数をピッチとして聞くのを止め、
 * リズムとして聞くようになります。
 * 例えば、オペラ歌手の「ビブラート」効果を模倣するために、 7.5 Hz で深度 20 を試してみてください。
 * これを低周波振動子、または LFO と呼びます。高周波数に設定されたモジュレーターも、
 * キャリア信号との調和的な関係があるときには特に興味深い効果を生み出すことができます。
 * 例えば、モジュレーターの周波数がキャリアの半分または2倍のときに何が起こるかを聴いてみてください。
 * これは John Chowning が 1960 年代に開発し、 1980 年代に合成を革新するようになった周波数変調生成の基礎であり、
 * ブラスやベルのような音を合成するためによく使われます。</p>
 *
 * <p>この例では、</p>
 * <p>- MouseX は変調深度（モジュレーターの振幅）を -150 から 150 まで制御します。
 * モジュレーターの振幅が 0 に設定されているとき（中央にあるとき）は、変調が影響を与えないことに注意してください。
 * 数字の絶対値が大きければ大きいほど、効果が大きくなります。
 * モジュレーターの波形が四角形の<code>[]</code>、サイン<code>~</code>
 * または三角形<code>/\</code>の場合、負の振幅は正の振幅と同じになります。
 * しかし、この例ではモジュレーターは非対称ののこぎり波で、このような形「/」で表現されます。
 * 負の数と掛けると、逆方向「\」に進むようになります。この違いを一番よく観察するためには、
 * 周波数を下げて試してみてください。</p>
 * <p>- MouseY はモジュレーターの周波数を 0 から 112 Hz まで制御します。
 * 可聴範囲（およそ 20 Hz から始まります）以下の変調周波数と、
 * その上、特にキャリア周波数（これは220Hzですので、
 * 半分、1/3、1/4など試してみてください）と
 * 調和的な関係にあるものを比較してみてください。</p>
 *
 * <p><em><span class="small">このサンプルをあなたのプロジェクトで動作させるためには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリ</a>
 * を含める必要があります。</em></span></p>
 */

let carrier; // これがこれから聴くオシレーターです。
let modulator; // このオシレーターはキャリアの周波数を変調します。

let analyzer; // 波形を視覚化するために使います。

// キャリア周波数の事前変調
let carrierBaseFreq = 220;

// モジュレーターの最小/最大範囲
let modMaxFreq = 112;
let modMinFreq = 0;
let modMaxDepth = 150;
let modMinDepth = -150;

function setup() {
  let cnv = createCanvas(800, 400);
  noFill();

  carrier = new p5.Oscillator('sine');
  carrier.amp(0); // 振幅の設定をします。
  carrier.freq(carrierBaseFreq); // 周波数を設定します。
  carrier.start(); // 振動し始めます。

  // タイプを「正方形('square')」、「正弦('sine')」、「三角形('triangle')」に変更してみてください。
  modulator = new p5.Oscillator('sawtooth');
  modulator.start();

  // モジュレーターの出力を加えて、キャリアの周波数を変調します。
  modulator.disconnect();
  carrier.freq(modulator);

  // オーディオを分析するためにFFTを作成します。
  analyzer = new p5.FFT();

  // マウスオーバー/タッチスタートでキャリアをフェードイン/フェードアウトします。
  toggleAudio(cnv);
}

function draw() {
  background(30);

  // mouseY をモジュレーターの周波数にマッピングします。
  let modFreq = map(mouseY, height, 0, modMinFreq, modMaxFreq);
  modulator.freq(modFreq);

  // モジュレーターの振幅を変えます。
  // ネガティブ・アンプはノコギリ波形を反転させ、パーカッシブなサウンドを奏でます。
  //
  let modDepth = map(mouseX, 0, width, modMinDepth, modMaxDepth);
  modulator.amp(modDepth);

  // 波形を分析します。
  waveform = analyzer.waveform();

  // 波形の形を描きます。
  stroke(255);
  strokeWeight(10);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, -height / 2, height / 2);
    vertex(x, y + height / 2);
  }
  endShape();

  strokeWeight(1);
  // 状況を表示します。
  text('Modulator Frequency: ' + modFreq.toFixed(3) + ' Hz', 20, 20);
  text(
    'Modulator Amplitude (Modulation Depth): ' + modDepth.toFixed(3),
    20,
    40
  );
  text(
    'Carrier Frequency (pre-modulation): ' + carrierBaseFreq + ' Hz',
    width / 2,
    20
  );
}

// 音声を切り替えるヘルパー関数です。
function toggleAudio(cnv) {
  cnv.mouseOver(function() {
    carrier.amp(1.0, 0.01);
  });
  cnv.touchStarted(function() {
    carrier.amp(1.0, 0.01);
  });
  cnv.mouseOut(function() {
    carrier.amp(0.0, 1.0);
  });
}
