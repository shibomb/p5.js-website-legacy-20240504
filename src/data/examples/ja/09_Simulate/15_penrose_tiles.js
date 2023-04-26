/*
 * @name ペンローズ・タイル
 * @arialabel 白い菱形が黒い背景に描かれたペンローズ・タイルの柄が作成されます
 * @frame 710,400
 * @description processing.org/examplesの「Penrose Tile」のデイヴィッド・ブリッツによる移植版です。
 */

let ds;

function setup() {
  createCanvas(710, 400);
  ds = new PenroseLSystem();
  // 以下の行で遊んでください
  ds.simulate(5);
}

function draw() {
  background(0);
  ds.render();
}

function PenroseLSystem() {
  this.steps = 0;

  // ペンローズ菱形のL-システムの公理と規則
  // リファレンスがあればいいのですが、私は見つけられませんでした
  this.axiom = "[X]++[X]++[X]++[X]++[X]";
  this.ruleW = "YF++ZF----XF[-YF----WF]++";
  this.ruleX = "+YF--ZF[---WF--XF]+";
  this.ruleY = "-WF++XF[+++YF++ZF]-";
  this.ruleZ = "--YF++++WF[+ZF++++XF]--XF";

  // 以下の2行で遊んでください
  this.startLength = 460.0;
  this.theta = TWO_PI / 10.0; // 36度  TWO_PI / 6.0 でお試しください
  this.reset();
}

PenroseLSystem.prototype.simulate = function (gen) {
  while (this.getAge() < gen) {
    this.iterate(this.production);
  }
}

PenroseLSystem.prototype.reset = function () {
  this.production = this.axiom;
  this.drawLength = this.startLength;
  this.generations = 0;
}

PenroseLSystem.prototype.getAge = function () {
  return this.generations;
}

// 代替規則を適用して生成用文字列の新しい繰り返しを作成する
PenroseLSystem.prototype.iterate = function() {
  let newProduction = "";

  for(let i=0; i < this.production.length; ++i) {
    let step = this.production.charAt(i);
    // 現在の文字が 'W' である場合、
    // 現在の文字を対応する規則で置き換える
    if (step == 'W') {
      newProduction = newProduction + this.ruleW;
    }
    else if (step == 'X') {
      newProduction = newProduction + this.ruleX;
    }
    else if (step == 'Y') {
      newProduction = newProduction + this.ruleY;
    }
    else if (step == 'Z') {
      newProduction = newProduction + this.ruleZ;
    }
    else {
      // 'F' 文字をすべてドロップし、
      // 他の文字（ '+', '-', '['、']' ）を変更しないでください。
      if (step != 'F') {
        newProduction = newProduction + step;
      }
    }
  }

  this.drawLength = this.drawLength * 0.5;
  this.generations++;
  this.production = newProduction;
}

// 生成用文字列をタートルグラフィックに変換する
PenroseLSystem.prototype.render = function () {
  translate(width / 2, height / 2);

  this.steps += 20;
  if(this.steps > this.production.length) {
    this.steps = this.production.length;
  }

  for(let i=0; i<this.steps; ++i) {
    let step = this.production.charAt(i);

    //'W', 'X', 'Y', 'Z' シンボルは、実際にはタートルアクションに対応しません
    if( step == 'F') {
      stroke(255, 60);
      for(let j=0; j < this.repeats; j++) {
        line(0, 0, 0, -this.drawLength);
        noFill();
        translate(0, -this.drawLength);
      }
      this.repeats = 1;
    }
    else if (step == '+') {
      rotate(this.theta);
    }
    else if (step == '-') {
      rotate(-this.theta);
    }
    else if (step == '[') {
      push();
    }
    else if (step == ']') {
      pop();
    }
  }
}