/*
 * @name 再帰的な木
 * @arialabel ユーザーが画面の左端にマウスを置くと、黒い背景に白い縦線が表示されます。ユーザーがマウスを右に移動すると、縦線の上部が木の枝状に広がってゆき、非常に幾何学的な形状の木になるまで枝がカーブします。
 * @description 再帰を使用して、シンプルな木状の構造をレンダリングします。
 * 枝分かれ角度は、水平マウスの位置の関数として計算されます。
 * マウスを左右に移動して角度を変更します。
 * Processing の Daniel Shiffman の <a href="https://processing.org/examples/tree.html">Recursive Tree Example</a> をもとにしています。
 */
let theta;

function setup() {
  createCanvas(710, 400);
}

function draw() {
  background(0);
  frameRate(30);
  stroke(255);
  // マウス位置に基づいて0から90度の角度を選択します。
  let a = (mouseX / width) * 90;
  // ラジアンに変換します。
  theta = radians(a);
  // 画面の下部から木を描き始めます。
  translate(width/2,height);
  // 線を120ピクセル描きます。
  line(0,0,0,-120);
  // その線の終点に移動します。
  translate(0,-120);
  // 再帰的な枝分かれを開始します！
  branch(120);

}

function branch(h) {
  // 各枝は前の枝の2/3の大きさにします。
  h *= 0.66;

  // すべての再帰関数には終了条件が必要です！
  // ここでは、枝の長さが2ピクセル以下の場合に終了します。
  if (h > 2) {
    push();    // 変換の現在の状態を保存します（現在どこにいるか）。
    rotate(theta);   // theta で回転します。
    line(0, 0, 0, -h);  // 枝を描きます
    translate(0, -h); // 枝の終点に移動します。
    branch(h);       // 2本の新しい枝を描くために自分自身を呼び出します！
    pop();     // ここに戻ってくるたびに、以前の行列状態を復元するために「pop」する必要があります。

    // 同じことを繰り返し、今度は「左」に枝分かれします！
    push();
    rotate(-theta);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h);
    pop();
  }
}
