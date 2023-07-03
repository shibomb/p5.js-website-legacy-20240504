/*
 * @name ドロップ
 * @arialabel 空の灰色のキャンバスが表示されており、ユーザーのコンピュータから灰色のキャンバスにドラッグされた場合に画像が表示されます。
 * @description キャンバス上に画像ファイルをドラッグして表示されるようにします。
 */

function setup() {
  // キャンバスを作成します。
  const c = createCanvas(710, 400);
  background(100);
  // ファイルがキャンバスにドロップされたときのイベントを追加します。
  c.drop(gotFile);
}

function draw() {
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text('Drag an image file onto the canvas.', width / 2, height / 2);
  noLoop();
}

function gotFile(file) {
  // 画像ファイルの場合
  if (file.type === 'image') {
    // 画像 DOM 要素を作成しますが、それは表示しません。
    const img = createImg(file.data).hide();
    // キャンバスに画像を描きます。
    image(img, 0, 0, width, height);
  } else {
    console.log('Not an image file!');
  }
}
