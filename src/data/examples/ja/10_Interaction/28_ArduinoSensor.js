/*
 * @name WebJack経由のArduinoセンサーデータ
 * @description WebJack は、 Arduino から（および他のソースから）オーディオを使用してデータを読み取る方法であり、
 * 基本的に Arduino をオーディオモデムに変えます。
 *
 * https://github.com/publiclab/webjack
 *
 * Note: WebJack と p5-webjack ライブラリは、 index.html に以下のように追加する必要があります：
 * <pre><code class="language-markup">&lt;script src="https://webjack.io/dist/webjack.js">&lt;/script></code></pre>
 * <pre><code class="language-markup">&lt;script src="https://jywarren.github.io/p5-webjack/lib.js">&lt;/script></code></pre>
 *
 * 動作サンプル: https://editor.p5js.org/jywarren/sketches/rkztwSt8M
 *
 * オーディオのテスト: https://www.youtube.com/watch?v=GtJW1Dlt3cg
 * このスケッチをArduinoにロードしてください：
 * https://create.arduino.cc/editor/jywarren/023158d8-be51-4c78-99ff-36c63126b554/preview
 * Arduino は ピン 3 ＋グラウンドから音声を出力します。マイクかオーディオケーブルを使ってください。
 */

function setup() { 
  createCanvas(400, 400);
  noStroke();
  fill('#ff00aa22');
  receiveSensorData(handleData);
}

function handleData(data, connection) {

  console.log(data); // 値をログに出力します。
  // data[0] は 1 番目の値、data[1] は 2 番目の値、、、というふうになります。

  // 描きます! http://p5js.org/reference/ を参照してください。
  background('#ddd');
  ellipse(100, 200, data[0]+10, data[0]+10);

  // connection.send('send data back to the Arduino if its listening');
}
