// https://p5js.org/examples/mobile-shake-ball-bounce.html を元にしています

// ボール配列
var balls = [];

// 動いたときの大きさ
var threshold = 30;
var accChange;
var accChangeT = 0;

function setup() {
  // キャンバス作成
  createCanvas(displayWidth, displayHeight);

  // 動いたときの大きさを測る変数
  accChange = createVector(0, 0);

  // ボール作成
  for (let i = 0; i < 20; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  // 背景作成
  background(0);

  // ボールの動き
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
  }
  // 動いたときの関数
  checkForShake();
}

//
function checkForShake() {
  // 1フレーム前の位置と比較して振れた大きさを計算
  accChange.x = abs(accelerationX - pAccelerationX);
  accChange.y = abs(accelerationY - pAccelerationY);
  // 全体の大きさ
  accChangeT = accChange.x + accChange.y;

  // かなり動いていたら
  if (accChangeT >= threshold) {
    for (let i = 0; i < balls.length; i++) {
      balls[i].shake();
      balls[i].turn();
    }
  }
  // あまり動いてなかったら
  else {
    for (let i = 0; i < balls.length; i++) {
      balls[i].stopShake();
      balls[i].turn();
      balls[i].move();
    }
  }
}

// ボールのクラス
class Ball {
  // コンストラクター
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.diameter = random(10, 30);
    this.speed = createVector(random(-2, 2), random(-2, 2));
    this.ospeed = createVector(this.speed.x, this.speed.y);
    this.direction = 0.7;
  }

  // 動きをつける
  move() {
    this.pos.x += this.speed.x * this.direction;
    this.pos.y += this.speed.y * this.direction;
  }

  // 画面からでようとしたときに反対の向きにする
  turn() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.direction = -this.direction;
    } else if (this.pos.y < 0) {
      this.pos.y = 0;
      this.direction = -this.direction;
    } else if (this.pos.x > width - 20) {
      this.pos.x = width - 20;
      this.direction = -this.direction;
    } else if (this.pos.y > height - 20) {
      this.pos.y = height - 20;
      this.direction = -this.direction;
    }
  }

  // 振ったときに加速する
  shake() {
    this.speed.x += random(5, accChange.x / 3);
    this.speed.y += random(5, accChange.x / 3);
  }

  // 最初に決めたスピードより早かったら少しずつスピードを落として最終的に最初のスピードにする
  stopShake() {
    if (this.speed.x > this.ospeed.x) {
      this.speed.x -= 0.6;
    } else {
      this.speed.x = this.ospeed.x;
    }
    if (this.speed.y > this.ospeed.y) {
      this.speed.y -= 0.6;
    } else {
      this.speed.y = this.ospeed.y;
    }
  }

  // 円表示
  display() {
    ellipse(this.pos.x, this.pos.y, this.diameter);
  }
}