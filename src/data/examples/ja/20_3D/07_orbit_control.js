/*
 * @name 軌道操作
 * @arialabel ユーザーは画面をドラッグすることで3D空間を移動できます。この空間は白い背景に、紫の立方体の列と緑のピラミッドがカーブを描いて並んでいます。
 * @description 軌道操作を使うと、ワールドをドラッグして移動できます。
 */
function setup() {
  createCanvas(710, 400, WEBGL);
}

function draw() {
  background(250);
  let radius = width * 1.5;

  // ドラッグしてワールドを移動します。
  orbitControl();

  normalMaterial();
  translate(0, 0, -600);
  for (let i = 0; i <= 12; i++) {
    for (let j = 0; j <= 12; j++) {
      push();
      let a = (j / 12) * PI;
      let b = (i / 12) * PI;
      translate(
        sin(2 * a) * radius * sin(b),
        (cos(b) * radius) / 2,
        cos(2 * a) * radius * sin(b)
      );
      if (j % 2 === 0) {
        cone(30, 30);
      } else {
        box(30, 30, 30);
      }
      pop();
    }
  }
}
