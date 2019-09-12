// shake count
var shakes = 0;

// helloworld
var img;
var pos = [];
var r = [];

// sparkling
var sparklings = [];

// load source
function preload() {
  img = loadImage('helloworld.png');
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  // prepare circle settings
  background(0);
  for (var i = 0; i < 600; i++) {
    pos = createVector(0, random(height / 2 - 200, height / 2 + 200));
    r[i] = random(10, 30);
  }

  imageMode(CENTER);
  frameRate(10);
}

function draw() {

}

// shaken
function deviceShaken() {
  // shake count
  shakes++;


  // hello world
  if (shakes < 500) {

    for (var i = 0; i < 600; i++) {
      // decide color
      var colr = map(pos[i].x, 0, 500, 50, 150);
      var colb = map(pos[i].y, 0, 500, 50, 150);

      // fill
      fill(colr, random(200, 250), colb, 50);
      noStroke();
      ellipse(x[i], y[i], r[i]);

      // refresh
      pos[i].x = pos[i].x + random(10);
      pos[i].y = pos[i].y + random(-5, 5);
    }

    // image on the top (image is transparent)
    image(img, width / 2, height / 2);
  }


  // sparkling
  else if (shakes < 1000) {
    // settings
    frameRate(60);
    background(255);
    blendMode(MULTIPLY);

    // create new sparklings
    var pos = createVector(random(width), random(height));
    for (var i = 0; i < 30; i++) {
      sparklings.push(new Sparkling(pos));
    }

    // show or delete sparklings
    for (var i = 0; i < sparklings.length; i++) {

      fill(random(50, 150), 240, 230);
      stroke(random(50, 150), 240, 230);

      if (sparklings[i].lifetime < 0) {
        sparklings.splice(i, 1);
      } else {
        sparklings[i].draw();
        sparklings[i].move();
      }

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