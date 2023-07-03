/*
 * @name ビデオキャンバス
 * @arialabel 灰色の背景に2つの同じビデオが再生されています。ひとつはカラーで、もうひとつは白黒です。
 * @description 複数のフォーマットのビデオを読み込み、それをキャンバスに描きます。
 * この例をローカルで実行するには、動作している
 * <a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。
 */
let fingers;

function setup() {
  createCanvas(710, 400);
  // 異なるブラウザ用に複数のフォーマットを指定します。
  fingers = createVideo(['assets/fingers.mov', 'assets/fingers.webm']);
  fingers.hide(); // デフォルトでは、ビデオは別の dom 要素に表示されます。
  // それを非表示にして、
  // 代わりにキャンバスに描画します。
}

function draw() {
  background(150);
  image(fingers, 10, 10); // キャンバスにビデオフレームを描画します。
  filter(GRAY);
  image(fingers, 150, 150); // キャンバスに2つ目のコピーを描画します。
}

function mousePressed() {
  fingers.loop(); // ビデオをループさせ、再生を開始します。
}
