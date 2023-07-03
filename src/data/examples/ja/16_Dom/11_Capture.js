/*
 * @name ビデオキャプチャー
 * @arialabel ユーザーのコンピュータのカメラからフィードを取得し、ウィンドウに表示します。
 * @frame 710,240
 * @description ウェブカメラからビデオをキャプチャし、反転フィルターを使ってキャンバスにも表示します。
 * デフォルトではキャプチャフィードも表示されます。
 * capture.hide() 行のコメントを解除することで、
 * フィードを非表示にすることができます。
 * */
let capture;

function setup() {
  createCanvas(390, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  //capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, 320, 240);
  filter(INVERT);
}
