/* 
 * @name 論理演算子 2
 * @arialabel 画面上の長方形を押すと、正方形が斜めに移動します。
 * @frame 400,400
 * @description <a href="https://www.rit.edu/directory/wmhics-w-michelle-harris">
   <b>Prof WM Harris,</b></a> により作成されました。
  どのようにして、ひとつのグローバル変数を用いて、ブール変数とブール表現で条件を作成し、
	論理演算子 ||、&&、!を用いて境界チェックを行っていながら、
  Xを描くボックスを作成するのかを示しています。<br/>
	<b>関数は</b>
	キャンバスの設定とボックスの作成の両方のために作成されます。
  背景色はキャンバス空間内のボックスの位置に依存しています。
  マウスボタンとキーが同時に押されると、
  “where”テキストとボックスの色がシアンに変わりますが、
  マウスボタンだけがクリックされるとアニメーションが開始されます。
  qまたはQが押されると、“Did you type q or Q?”というテキストが青色に変わります。
	それ以外の場合は紫色になります。
  マウスがテキスト、“withinRect”を含むオレンジ色のボックス内に
	配置されると、形状がピンク色になります。 
 */


// ひとつの座標で両ボックスの位置を管理しています :)
let where = 0; // ボックスの位置を制御します。

function setup() {
  createCanvas(400, 400);
}

function draw() {
  // スライド4と同様に、OR(||) を使用して
  // キャンバスの背景色を設定します。
  if ((where < 0) || (where > height)) {
    background("beige");
  } else {
    background("chocolate");
  }

  // スライド4と同様に、AND(&&)を使用して
  // ボックスとテキストの塗りつぶしの色を設定します。
  if (mouseIsPressed && keyIsPressed) {
    fill("cyan");
  } else {
    fill(255);
  }

  // 左のボックス
  rect(where, where, 40);

  // 右のボックス。ボックスのサイズの分だけ x座標をずらしてします。
  rect(width - where - 40, where, 40);

  // ボックスを移動します。
  where = where + 1;

  // ボックスの位置を表示します。
  text("where is " + where, 150, 30);

  // NOT(!) と OR(||)演算子による確認です。
  if (!(key === "q" || key === "Q")) {
    fill("purple");
  } else {
    fill("dodgerBlue");
  }
  // 現在のキーの値を表示します。
  text("Did you type a q or Q? " + key, 150, 70);

  //*** 境界チェック ***
  // マウスが長方形の境界線内にあるか？
  // 左、右、上、下
  let withinRect = (mouseX >= 150) &&
    (mouseX <= 150 + 100) &&
    (mouseY >= 300) &&
    (mouseY <= 300 + 40);
  // withinRectの値に基づいて、塗りつぶしの色を変えます。
  if (withinRect) {
    fill("pink");
  } else {
    fill("orange");
  }
  // 矩形を描きます。
  rect(150, 300, 100, 40);
  // 長方形のラベルとして withinRect の値を表示します。
  fill(0);
  text("withinRect " + withinRect, 160, 320);
}

// ボックス表示を再スタートします。
function mousePressed() {
  // ボックスをキャンバスの上に戻します。
  where = -50;
}