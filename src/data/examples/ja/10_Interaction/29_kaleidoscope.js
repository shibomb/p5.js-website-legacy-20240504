/*
 * @name 万華鏡
 * @arialabel 灰色の背景に、ユーザーが黒い太い線を描くと、万華鏡のように円形に 5 回鏡写しされます。
 * @description 万華鏡は、2つ以上の反射面が互いに斜めに傾いている光学機器です。この例では、万華鏡の動作を再現しようとしています。シンメトリー変数で反射の数を設定し、スクリーンに描画を開始します。ブラシのサイズはスライダーで調整します。画面クリアは画面を消去します。保存ボタンは、作成したアートの .jpg ファイルをダウンロードします。
 */
// シンメトリーに対応する反射回数です。反射回数を変える時は、数値を変更してください。
let symmetry = 6;   

let angle = 360 / symmetry;
let saveButton, clearButton, mouseButton, keyboardButton;
let slider;

function setup() { 
  createCanvas(710, 710);
  angleMode(DEGREES);
  background(127);

  // ファイルの保存ボタンを作成します。
  saveButton = createButton('save');
  saveButton.mousePressed(saveFile);

  // 画面クリアボタンの作成します。
  clearButton = createButton('clear');
  clearButton.mousePressed(clearScreen);

  // フルスクリーンボタンの作成します。
  fullscreenButton = createButton('Full Screen');
  fullscreenButton.mousePressed(screenFull);

  // ブラシの太さのスライダーを設定します。
  brushSizeSlider = createButton('Brush Size Slider');
  sizeSlider = createSlider(1, 32, 4, 0.1);
}

// ファイル保存機能
function saveFile() {
  save('design.jpg');
}

// 画面クリア機能
function clearScreen() {
  background(127);
}

// フルスクリーン機能
function screenFull() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function draw() {
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;
    
    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let sw = sizeSlider.value();
        strokeWeight(sw);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}
