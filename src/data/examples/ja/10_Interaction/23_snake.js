/*
 * @name スネークゲーム
 * @arialabel 黒い背景に白く長い丸線で描かれたヘビを i,j,k,l キーで操作するスネークゲームです。ユーザーはこれらのキーで、画面端にぶつからないようにスネークを動かし、エサをあらわす小さな白い丸を食べてスネークを成長させます。
 * @description 有名なスネークゲームです！ 実行をクリックしたら、黒いエリアの任意の場所をクリックし、
 * i j k l を使ってスネークを操作します。
 * スネークが自分自身または壁に当たらないようにしてください。<br>
 * 例の作成者: <a href='https://github.com/prashantgupta24' target='_blank'>Prashant Gupta</a>
 */

// スネークは小さなセグメントに分割され、それぞれの 'draw' 呼び出しで描画・編集されます。
let numSegments = 10;
let direction = 'right';

const xStart = 0; // スネークの開始 x 座標
const yStart = 250; // スネークの開始 y 座標
const diff = 10;

let xCor = [];
let yCor = [];

let xFruit = 0;
let yFruit = 0;
let scoreElem;

function setup() {
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');

  createCanvas(500, 500);
  frameRate(15);
  stroke(255);
  strokeWeight(10);
  updateFruitCoordinates();

  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < numSegments - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
  }
  updateSnakeCoordinates();
  checkGameStatus();
  checkForFruit();
}

/*
 セグメントはスネークの進行方向にしたがって更新されます。
 すべてのセグメント 0 から n-1 まで、つまり、セグメント0はその次のセグメント1の値を取得し、
 セグメント1はセグメント2の値を取得、、、
 というふうに次々に取得していくことで、スネークの移動が実現されます。

 最後のセグメントはスネークの進行方向にしたがって追加されます。
 スネークが左または右に進んでいる場合、最後のセグメントの x 座標は
 二つ目から最後のセグメントよりもあらかじめ定義された値 'diff' の分だけ増加します。
 そして、スネークが上か下に動いている場合、最後のセグメントの y 座標が影響を受けます。
 */
function updateSnakeCoordinates() {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction) {
    case 'right':
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'up':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case 'left':
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'down':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}

/*
 常にヘビの頭の位置 `xCor[xCor.length - 1]` と `yCor[yCor.length - 1]` をチェックして、
 それが画面の境界に触れているか、
 またはヘビが自身に衝突しているかどうかを判断します。
*/
function checkGameStatus() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    noLoop();
    const scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Game ended! Your score was : ' + scoreVal);
  }
}

/*
 もしスネークの頭の（x,y）座標が自身のセグメントのいずれかひとつの（x,y）座標と同じである場合、
 スネークが自分自身にぶつかったということです。
*/
function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
  }
}

/*
 スネークがフルーツを食べるたびに、セグメントの数を増やし、
 配列の先頭に、最後尾と同じ内容のセグメントを挿入します
（最後尾に再び最後のセグメントを追加するということです。そうすることで尾を延ばしています）
*/
function checkForFruit() {
  point(xFruit, yFruit);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    const prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Score = ' + (prevScore + 1));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    updateFruitCoordinates();
  }
}

function updateFruitCoordinates() {
  /*
    この複雑な計算は、100 と width - 100 の範囲内、かつ、
    10 で割り切れる整数(ランダム値を四捨五入)を求めています。
    なぜなら、スネークを10の倍数で動かすからです。
  */

  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
}

function keyPressed() {
  switch (keyCode) {
    case 74:
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 76:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 73:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 75:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}
