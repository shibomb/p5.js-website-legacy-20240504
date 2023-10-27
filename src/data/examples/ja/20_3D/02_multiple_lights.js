/*
 * @name 複数の光源
 * @arialabel 画面の左側に回転する虹色の立方体、右側に虹色の球体が表示されます。ユーザーのマウスは、形状を照らす光源として機能し、光の方向を制御できます。
 * @description ひとつのスケッチですべての種類の光源を使用することができます。
 */
function setup() {
  createCanvas(710, 400, WEBGL);

  describe(
    'a 3d example containing a spinning box and a sphere, each lit with a number of different lights, including ambient (gray), directional (red), spotlight (green), and point (blue).'
  );
}

function draw() {
  background(0);

  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  // /// ambient light is gray
  ambientLight(50);
  // directional light is red
  directionalLight(255, 0, 0, 0.25, 0.25, 0);
  // spotlight is green
  spotLight(0, 255, 0, 150, 0, 250, 0, 0, -1);
  // point light is blue
  pointLight(0, 0, 255, locX, locY, 250);

  push();
  translate(-width / 4, 0, 0);
  rotateZ(frameCount * 0.02);
  rotateX(frameCount * 0.02);
  specularMaterial(250);
  box(100, 100, 100);
  pop();

  translate(width / 4, 0, 0);
  ambientMaterial(250);
  sphere(120, 24);
}
