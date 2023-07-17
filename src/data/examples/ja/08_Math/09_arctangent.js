/*
 * @name アークタンジェント
 * @arialabel 3つの、目と瞳孔に似ている白い円とその中の小さな緑の円があります。緑の円で表される瞳孔は、ユーザーのマウスがある方向を見ています。
 * @description マウスを動かして目の方向を変えます。<br>atan2() 関数は各目からカーソルへの角度を計算します。
 */
let e1, e2, e3;

function setup() {
  createCanvas(720, 400);
  noStroke();
  e1 = new Eye(250, 16, 120);
  e2 = new Eye(164, 185, 80);
  e3 = new Eye(420, 230, 220);
}

function draw() {
  background(102);
  e1.update(mouseX, mouseY);
  e2.update(mouseX, mouseY);
  e3.update(mouseX, mouseY);
  e1.display();
  e2.display();
  e3.display();
}

function Eye(tx, ty, ts) {
  this.x = tx;
  this.y = ty;
  this.size = ts;
  this.angle = 0;

  this.update = function(mx, my) {
    this.angle = atan2(my - this.y, mx - this.x);
  };

  this.display = function() {
    push();
    translate(this.x, this.y);
    fill(255);
    ellipse(0, 0, this.size, this.size);
    rotate(this.angle);
    fill(153, 204, 0);
    ellipse(this.size / 4, 0, this.size / 2, this.size / 2);
    pop();
  };
}
