/*
 * @name インクリメント・デクリメント
 * @arialabel Two black gradient rectangles on the bottom right and top left of the screen travel horizontally to the other side and leave a gradient grey path behind 
 * @description 「a++」と書くと、「a = a + 1」と同じ意味になります。
 * 「a--」と書くと、「a = a - 1」と同じ意味になります。
 */
let a;
let b;
let direction;

function setup() {
  createCanvas(710, 400);
  colorMode(RGB, width);
  a = 0;
  b = width;
  direction = true;
  frameRate(30);
}

function draw() {
  a++;
  if (a > width) {
    a = 0;
    direction = !direction;
  }
  if (direction === true) {
    stroke(a);
  } else {
    stroke(width - a);
  }
  line(a, 0, a, height / 2);

  b--;
  if (b < 0) {
    b = width;
  }
  if (direction == true) {
    stroke(width - b);
  } else {
    stroke(b);
  }
  line(b, height / 2 + 1, b, height);
}
