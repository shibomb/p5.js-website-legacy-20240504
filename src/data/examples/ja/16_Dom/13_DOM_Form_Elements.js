/* 
 * @name DOM フォーム要素
 * @arialabel 「“checked”」の文字が書かれた薄黄色のボックスがあり、その下に、チェックボックス、スライダー、空のテキスト入力欄などのフォーム要素があります。
 * @frame 600,400
 * @description <a href="https://www.rit.edu/directory/wmhics-w-michelle-harris">
   <b>Prof WM Harris</b></a> は <b>どのように</b> p5 の DOM フォーム要素を使ってスライダー、
ボタン、チェックボックス、ラジオグループ、セレクトメニュー、入力フィールドを使うのかを投稿しました。<br/>
次のような関数が作成されます: 
キャンバスのセットアップ、テキスト付きチェックボックス、
テキストを投影するテキストボックス、ボタン付きスライダー、
選択によってキャンバス上の異なるエリアに長方形を投影する3つの選択、
フォント変更のドロップダウンメニュー
*/

/* グローバル変数 */
// p5 DOMフォーム要素
let slider1;
let button1;
let checkbox1;
let radio1;
let select1;
let entry1;

function setup() {
  createCanvas(200, 200);
  background("beige");

  checkbox1 = createCheckbox("Check me");

  createP(); // <p>タグ付きスペーサー

  createSpan("What's your name? "); // entry1 のラベル
  // createInput([value], [type])
  // type: "text" (default), "number",
  // "date", "password", "email", etc.
  entry1 = createInput();
  // 入力フィールドのテキストが変更されたら、
  // entryCallback 関数を呼び出します。
  entry1.changed(entryCallback);

  createP(); // <p>タグ付きスペーサー

  // createSlider(min, max, [value], [step])
  slider1 = createSlider(10, 200);

  button1 = createButton("Press me"); //, "pressed");
  // ユーザーが button1 の上でマウスを
  // クリックしたときのコールバック関数を割り当てます。
  button1.mouseClicked(button1Clicked);

  createP(); // <p>タグ付きスペーサー

  radio1 = createRadio();

  // .option([value], [contentLabel])
  // パラメーターがひとつの場合は、内容と値の両方の意味になります。
  // 値は文字列として扱われます。
  radio1.option(1, "cranberries");
  radio1.option(2, "almonds");
  radio1.option(3, "gouda");

  radio1.value("1"); // 初期値を設定します。

  createP(); // <p>タグ付きスペーサー

  select1 = createSelect();
  //.option([contentValue],[value])
  // パラメーターがひとつの場合は、内容と値の両方の意味になります。
  // 値は文字列として扱われます。
  select1.option("Sans-serif");
  select1.option("Serif");
  select1.option("Fantasy");
  // 変更された場合、 select1Changed を呼び出します。
  select1.changed(select1Changed);
}

function draw() {
  // slider1 から値を取得
  let gray = slider1.value();
  fill(gray);

  // マウスが隅にある場合、 checkbox1 をオンにします。
  if ((mouseX < width / 3) &&
    (mouseY < height / 3)) {
    checkbox1.checked(true);
  }
  // checkbox1 はチェックされているならば、そう言ってください。
  if (checkbox1.checked()) {
    text("CHECKED", 20, 40);
  }

  switch (radio1.value()) {
    // ラジオの値は常に文字列です。
    case "1":
      rect(0, 0, width, 50);
      break;
    case "2":
      rect(0, 70, width, 50);
      break;
    case "3":
      rect(0, 140, width, 50);
      break;
  }
}

// button1 のコールバック関数
function button1Clicked() {
  // スライダーの値を 200 に戻します。
  slider1.value(200);
}


// select1 のコールバック関数
function select1Changed() {
  switch (select1.value()) {
    case "Sans-serif":
      textFont("sans-serif");
      break;
    case "Serif":
      textFont("serif");
      break;
    case "Fantasy":
      textFont("fantasy");
      break;
  }
}

// entry1 のコールバック関数
function entryCallback() {
  for (let i = 0; i < 25; i++) {
    text(entry1.value(), random(width),
          random(height));
  }

}

function mouseClicked() {
  console.log("button1?", button1.value());
  console.log("checkbox1?", checkbox1.value());
  // どちらの .value を更新しますか？
  // ボタンやチェックボックスに目に見える変化はありません。
  checkbox1.value("Check again");
  button1.value("clicked?");
}

function keyTyped() {
  switch (key) {
    case "r":
      // slider1 の値を 100 に変更します。
      slider1.value(100);
      break;
  }
}