/*
 * @name 歌
 * @arialabel 灰色の背景を7つの縦長の長方形に分割しています。ユーザーがホバーすると、長方形は濃い灰色に変わります。ユーザーがクリックすると、それぞれの矩形がシアン色に変わり、異なる音を奏でます。
 * @frame 720, 430
 * @description 曲を再生する。
 * このサンプルを自分のプロジェクトで動作させるためには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound ライブラリ</a>
 * を含める必要があります。
 */
// 音階のmidiノート
let notes = [ 60, 62, 64, 65, 67, 69, 71];

// 楽曲を自動再生する場合
let index = 0;
let song = [
  { note: 4, duration: 400, display: "D" },
  { note: 0, duration: 200, display: "G" },
  { note: 1, duration: 200, display: "A" },
  { note: 2, duration: 200, display: "B" },
  { note: 3, duration: 200, display: "C" },
  { note: 4, duration: 400, display: "D" },
  { note: 0, duration: 400, display: "G" },
  { note: 0, duration: 400, display: "G" }
];
let trigger = 0;
let autoplay = false;
let osc;

function setup() {
  createCanvas(720, 400);
  let div = createDiv("Click to play notes or ")
  div.id("instructions");
  let button = createButton("play song automatically.");
  button.parent("instructions");
  // 自動再生のトリガーです。
  button.mousePressed(function() {
    if (!autoplay) {
      index = 0;
      autoplay = true;
    }
  });

  // 三角波オシレーター
  osc = new p5.TriOsc();
  // 静寂をスタート
  osc.start();
  osc.amp(0);
}

// 音を鳴らすための関数
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // フェードインさせます。
  osc.fade(0.5,0.2);

  // duration が設定されている場合は、フェードアウトします。
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function draw() {

  // 自動再生していて、次の音符の時間になった場合
  if (autoplay && millis() > trigger){
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
    // 次の音に移動します。
    index ++;
  // 終わりまできたら、自動再生を停止します。
  } else if (index >= song.length) {
    autoplay = false;
  }


  // キーボードを描きます。

  // 各キーに対応する幅
  let w = width / notes.length;
  for (let i = 0; i < notes.length; i++) {
    let x = i * w;
    // マウスがキーの上にある場合
    if (mouseX > x && mouseX < x + w && mouseY < height) {
      // クリックしている場合
      if (mouseIsPressed) {
        fill(100,255,200);
      // あるいは、ただ載せているだけの場合、
      } else {
        fill(127);
      }
    } else {
      fill(200);
    }

    // あるいは、曲を再生しているのであれば、その音も強調します。
    if (autoplay && i === song[index-1].note) {
      fill(100,255,200);
    }

    // キーを描きます。
    rect(x, 0, w-1, height-1);
  }

}

// マウスをクリックしたとき
function mousePressed(event) {
  if(event.button == 0 && event.clientX < width && event.clientY < height) {
    // マウスをキーインデックスに対応させます。
    let key = floor(map(mouseX, 0, width, 0, notes.length));
    playNote(notes[key]);
  }
}

// マウスリリース時にフェードアウトさせます。
function mouseReleased() {
  osc.fade(0,0.5);
}
