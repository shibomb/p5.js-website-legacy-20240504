/*
 * @name 3D プリミティブ
 * @arialabel 灰色の背景に、左下に濃い灰色の立方体、右下に白い輪郭の球体があります。
 * @frame 720,400 (optional)
 * @description 人工的な空間に数学的 3D オブジェクトを配置します。
 * box() および sphere() 関数は、それらのサイズを指定するために少なくとも1つのパラメーターを指定します。
 * これらの形状は translate() 関数を使用して位置が指定されます。
 */
function setup() {
  createCanvas(710, 400, WEBGL);
}

function draw() {
  background(100);

  noStroke();
  fill(50);
  push();
  translate(-275, 175);
  rotateY(1.25);
  rotateX(-0.9);
  box(100);
  pop();

  noFill();
  stroke(255);
  push();
  translate(500, height * 0.35, -200);
  sphere(300);
  pop();
}
