// shake
var shakes = 0;

// helloworld
var img;
var NUM = 600;
var x = [];
var y = [];
var r = [];
var colr;
var colb;

// sparkling
var sparklings = [];


function preload() {
  img = loadImage('helloworld.png');
}

function setup() {
  // stop scroll horizonall direction
  window.addEventListener("touchstart", function (event) {
    event.preventDefault();
  }, {
    passive: false
  });
  window.addEventListener("touchmove", function (event) {
    event.preventDefault();
  }, {
    passive: false
  });

  createCanvas(windowWidth, windowHeight);

  // prepare to background
  frameRate(60);
  background(0);
  for (var i = 0; i < NUM; i++) {
    x[i] = 0;
    y[i] = random(height / 2 - 200, height / 2 + 200);
    r[i] = random(10, 30);
  }
  imageMode(CENTER);
}

function draw() {
  // hello world
  if (shakes < 100) {

    for (var i = 0; i < NUM; i++) {
      colr = map(x[i], 0, 500, 50, 150);
      colb = map(y[i], 0, 500, 50, 150);
      fill(colr, random(200, 250), colb, 50);
      noStroke();
      ellipse(x[i], y[i], r[i]);
      x[i] = x[i] + random(10);
      y[i] = y[i] + random(-5, 5);
    }
    image(img, width / 2, height / 2);

  }
  // sparkling
  else if (shakes < 200) {
    background(255);
    blendMode(OF_BLENDMODE_MULTIPLY);

    for (var i = 0; i < sparklings.length; i++) {

      fill(random(50, 150), 240, 230);
      if (sparklings[i].lifetime < 0) {
        sparklings.splice(i, 1);
      } else {
        sparklings[i].draw();
        sparklings[i].move();
      }
    }

  }
}

// shaken
function deviceShaken() {
  shakes++;

  if (shakes > 100) {
    var pos = createVector(random(width), random(height));
    for (var i = 0; i < 30; i++) {
      sparklings.push(new Sparkling(pos));
    }
  }
}

class Sparkling {
  // 初期化（constructor＝コンストラクター＝建設者）
  constructor(pos) {
    // 花火本体の位置で初期化
    this.position = createVector(pos.x, pos.y);
    // 飛び散る向きをランダムに決める
    this.velocity = createVector(ofRandom(-3, 3), ofRandom(-3, 3)); // 速度

    this.radius = random(5, 20);
    // 花火の粒が表示される時間をランダムに決める
    this.lifetime = random(120, 180);
  }

  // 移動
  move() {
    // 空気抵抗
    this.velocity.mult(0.98);
    // 速度で座標が変化する
    this.position.add(this.velocity);
    // 残りの時間を減らす
    this.lifetime--;
  }

  // 表示
  draw() {
    // 小さな円を描く
    ellipse(this.position.x, this.position.y, 2);
  }
}