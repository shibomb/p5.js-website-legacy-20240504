/*
 * @name DOMの変更
 * @arialabel 黒いフォントの言葉が白い背景上で揺れています。
 * @frame 710,300
 * @description draw() が呼び出されるたびにDOM要素を作成し、
 * そのプロパティを修正します。
 */
let dancingWords = [];

class DanceSpan {
  constructor(element, x, y) {
    element.position(x, y);
    this.element = element;
    this.x = x;
    this.y = y;
  }

  brownian() {
    this.x += random(-6, 6);
    this.y += random(-6, 6);
    this.element.position(this.x, this.y);
  }
}

function setup() {
  // この段落は、コードの main ブロックとは別に作成されています。
  // これは要素の作成と選択を区別するためです。
  // 選択された要素は p5js によって作成する必要はなく、
  // プレーンなHTMLで十分です。
  createP(
    'I learn in this Letter, that Don Peter of Aragon, ' +
      ' comes this night to Messina'
  ).addClass('text').hide();

  // この行は作成したばかりの段落を取得しますが、
  // HTMLページ内のクラス 'text' をもつ他の要素も
  // 取得します。
  const texts = selectAll('.text');

  for (let i = 0; i < texts.length; i++) {
    const paragraph = texts[i].html();
    const words = paragraph.split(' ');
    for (let j = 0; j < words.length; j++) {
      const spannedWord = createSpan(words[j]);
      const dw = new DanceSpan(spannedWord, random(600), random(200));
      dancingWords.push(dw);
    }
  }
}

function draw() {
  for (let i = 0; i < dancingWords.length; i++) {
    dancingWords[i].brownian();
  }
}
