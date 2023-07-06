/**
 *  @name 音声フォーマット
 *  @arialabel ページがロードされると、緑色のスクリーンで音楽が再生されます。ユーザーがクリックすると、画面が赤くなり、音楽の再生が止まります。
 *  @description <p>技術的には、特許問題のため、すべてのWebブラウザでサポートされている単一の
 *  音声フォーマットは存在しません。たとえば、
 *  OS X と Windows の主要なブラウザの最新バージョンで <a href="http://caniuse.com/#feat=mp3">mp3 はサポート</a>
 *  されています。
 *  しかし、一部の一般的でないオペレーティングシステムや
 *  ブラウザでは利用できないかもしれません。</p>
 *
 *  <p>完全な互換性を確保するために、同じ音声ファイルを複数のフォーマットで含めることができます。
 *  例えば、'sound.mp3' と 'sound.ogg' です。
 *  （Ogg は mp3 のオープンソース版です）
 *  <a href="http://media.io/">media.io</a> で
 *  音声ファイルを Web フレンドリーなフォーマットに無料で変換できます。</p>
 *
 *  <p>soundFormats() メソッドは、スケッチとともに
 *  含めたフォーマットを loadSound に教えます。その後、loadSound は
 *  クライアントの Web ブラウザでサポートされる最初のフォーマットのロードを
 *  試みます。</p>
 *
 * <p><em><span class="small"> このサンプルをローカルで実行するには、
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.soundライブラリ</a>
 * 音声ファイル、および、稼働中の<a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。</span></em>
 */
let song;

function preload() {
  // .ogg ファイル と .mp3 ファイルの両方を用意しました。
  soundFormats('ogg', 'mp3');

  // mp3 がこのブラウザでサポートされていない場合、
  // loadSound はスケッチに含まれる
  // ogg ファイルを読み込みます。
  song = loadSound('assets/lucky_dragons_-_power_melody.mp3');
}

function setup() {
  createCanvas(710, 200);

  // preload() で曲をロードしたので、 setup() で再生準備が完了しています。
  song.play();
  background(0, 255, 0);
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() はブール値を返します。
    song.pause();
    background(255, 0, 0);
  } else {
    song.play(); // 再生は一時停止位置から再開されます。
    background(0, 255, 0);
  }
}
