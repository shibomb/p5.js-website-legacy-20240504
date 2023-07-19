/*
 * @name 単語
 * @arialabel 灰色の背景に黒から白へのグラデーションで “ichi”、“ni”、“san”、"shi” の文字が3列で表示されています。最初の列は右揃え、真ん中の列は中央揃え、左の列は左揃えになっています。
 * @description text()関数は、画面に文字を書き込むために使用します。
 * 単語は、textAlign() 関数で左揃え、中央揃え、右揃えにすることができ、図形と同様に、fill() で色を付けることができます。
 */
let font,
  fontsize = 40;

function preload() {
  // assets ディレクトリに保存されている .ttf や .otf フォントは、
  // setup() と draw() が呼ばれる前に確実に読み込みます。
  font = loadFont('assets/SourceSansPro-Regular.otf');
}

function setup() {
  createCanvas(710, 400);

  // テキストの特徴を設定します。
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(160);

  // テキストを右に揃えます。
  // そして、キャンバスの左3分の1で drawWords() を実行します。
  textAlign(RIGHT);
  drawWords(width * 0.25);

  // テキストを中央に揃えます。
  // そして、キャンバスの中央で drawWords() を実行します。
  textAlign(CENTER);
  drawWords(width * 0.5);

  // テキストを左に揃えます。
  // そして、キャンバスの右3分の1で drawWords() を実行します。
  textAlign(LEFT);
  drawWords(width * 0.75);
}

function drawWords(x) {
  // text()関数は3つのパラメーターを必要とします。
  // 描画するテキスト、水平位置、
  // そして、垂直位置です。
  fill(0);
  text('ichi', x, 80);

  fill(65);
  text('ni', x, 150);

  fill(190);
  text('san', x, 220);

  fill(255);
  text('shi', x, 290);
}
