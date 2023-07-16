/* 
 * @name 条件付きシェイプ
 * @arialabel 画面の中央は白で、ユーザーのマウスはその中に赤い点を描きます。画面の両端はベージュ色で、その両端をマウスが上下に移動すると、画面の中央に赤い縁取りのあるオレンジ色の四角が上下に描かれます。
 * @frame 400,400
 * @description <a href="https://www.rit.edu/directory/wmhics-w-michelle-harris">
   <b>Prof WM Harris,</b></a> からの貢献です。
   マウスの位置によって異なる図形をキャンバスの中央に描く方法です。<br/>
	<b>関数は</b>
  左右にマーカーを配置したメイン・キャンバスのために作成されます。
  また、もうひとつはキャンバスとマーカーと、
  マウスの位置関係ためにも作成されます。
  もしマウスが左側のベージュの長方形内にあれば、
  円がキャンバスの中央に描かれます。
  もしマウスが右側のベージュの長方形内にあれば、
  正方形がキャンバスの中央に描かれます。
*/
function setup() {
    createCanvas(400, 400);
    strokeWeight(3);
    // 円と正方形を一致させるために正方形の中心をセンターに設定します。
    rectMode(CENTER);
    
    // 画面両端をわかりやすくするために、長方形を描きます。
    noStroke();
    fill("beige");
    rect(5, height / 2, 10, height);
    rect(width - 5, height / 2, 10, height);
    fill("orange");
    stroke("brown");
  
  }
  
  function draw() {
    point(mouseX, mouseY);
  
    // if (test) {doThis; }
    // test: キャンバスの左端部分に mouseX があるか
    // doThis: mouseY の位置に円を描きます。
    if (mouseX < 10) {
      circle(width / 2, mouseY, 20);
    }
  
    // test: キャンバスの右端部分に mouseX があるか
    // doThis: mouseY の位置に正方形を描きます。
    if (mouseX > width - 10) {
      square(width / 2, mouseY, 20);
    }
  
  }
