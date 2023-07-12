/*
 * @name サウンドエフェクト
 * @arialabel 押すとドアベルの音が鳴ります。
 * @description <p>円の内部でクリックされたときにサウンドエフェクトを再生します。</p>
 * <p><em><span class="small"> この例をローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.soundライブラリ</a>、
 * 音声ファイル、および、稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em>
 */
// Adapted from Learning Processing by Daniel Shiffman
// http://www.learningprocessing.com
// Doorbell sample by Corsica_S via freesound.org,
// Creative Commons BY 3.0

// ドアベル（実際はボタン）を表すクラス
class Doorbell {
  constructor(x_, y_, r_) {
    // ロケーションとサイズ
    this.x = x_;
    this.y = y_;
    this.r = r_;
  }
  // ドアベルの中にポイントがあるか？(マウスのロールオーバーなどに使用します。)
  contains(mx, my) {
    return dist(mx, my, this.x, this.y) < this.r;
  }

  // ドアベルを表示します。（ハードコードされた色。）
  display(mx, my) {
    if (this.contains(mx, my)) {
      fill(100);
    } else {
      fill(175);
    }
    stroke(0);
    strokeWeight(4);
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.r, this.r);
  }
}

// 音声ファイルオブジェクト
let dingdong;

// ドアベルオブジェクト（サウンドのトリガーとなるもの）
let doorbell;

function setup() {
  createCanvas(200, 200);

  // 音声ファイルをロードします。
  // MP3版とOGG版の両方を用意しました。
  soundFormats('mp3', 'ogg');
  dingdong = loadSound('assets/doorbell.mp3');

  // 新しいドアベルを作ります。
  doorbell = new Doorbell(width / 2, height / 2, 32);
}

function draw() {
  background(255);
  // ドアベルを表示します。
  doorbell.display(mouseX, mouseY);
}

function mousePressed() {
  // ユーザーがドアベルをクリックしたら、サウンドを再生します！
  if (doorbell.contains(mouseX, mouseY)) {
    dingdong.play();
  }
}
