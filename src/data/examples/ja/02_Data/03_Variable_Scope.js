/*
 * @name 変数のスコープ
 * @arialabel 黒い背景に、左側に白の縦線が凝縮されたデザインが表示されています。
 * @description 変数には、グローバルまたは関数の "スコープ "があります。
 * 例えば、setup() 関数と draw() 関数のどちらかの中で宣言された変数は、
 * これらの関数内でのみ使用できます。
 * グローバル変数は、setup() と draw() の外で宣言された変数で、
 * プログラム内のどこでも使用できます。
 * 関数内の変数がグローバル変数と同じ名前で宣言されている場合、
 * プログラムは現在のスコープ内で関数内の変数を使用して計算を行うことになります。
 */
let a = 80; // グローバル変数 "a "の作成

function setup() {
  createCanvas(720, 400);
  background(0);
  stroke(255);
  noLoop();
}

function draw() {
  // グローバル変数 "a"を使って線を引きます。
  line(a, 0, a, height);

  // forループでローカル変数 "a" を使用します。
  for (let a = 120; a < 200; a += 3) {
    line(a, 0, a, height);
  }

  // カスタム関数 drawAnotherLine() を呼び出します。
  drawAnotherLine();

  // カスタム関数 drawYetAnotherLine() を呼び出します。
  drawYetAnotherLine();
}

function drawAnotherLine() {
  // この関数のローカル変数 "a" を新規に作成する。
  let a = 320;
  // ローカル変数 "a" を使って線を引く
  line(a, 0, a, height);
}

function drawYetAnotherLine() {
  // 新しいローカル変数 "a" が設定されていないため、
  // この線は、値が 20 に設定された元のグローバル変数 "a" を使用して
  // 描画されます。
  line(a + 3, 0, a + 3, height);
}
