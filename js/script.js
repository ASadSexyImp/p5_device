// shake count
var shakes = 0;
var mode = "";

// helloworld
var img;
var pos = [];
var r = [];
var isShake = false;

// sparkling
var sparklings = [];

// hologram
var x;
var y;
var z;

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


  if (mode == "helloworld" && isShake) {
    background(128);
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

    // reset status
    isShake = false

  } else if (mode == "sparkling") {
    background(255);
    // show or delete sparklings
    for (var i = 0; i < sparklings.length; i++) {

      if (sparklings[i].lifetime < 0) {
        sparklings.splice(i, 1);
      } else {
        sparklings[i].draw();
        sparklings[i].move();
      }

    }
  } else if (mode == "hologram") {
    background(0);
    translate(width / 2, 0, -600);
    fill(99, 170, 159, 10);
  }


}

// shaken
function deviceShaken() {
  // shake count
  shakes++;
  // device is shaken
  isShake = true;

  // hello world
  if (shakes < 250) {
    mode = "helloworld";
  }
  // sparkling
  else if (shakes < 500) {
    mode = "sparkling";
    // settings
    frameRate(60);

    // create new sparklings
    var pos = createVector(random(width), random(height));
    for (var i = 0; i < 15; i++) {
      sparklings.push(new Sparkling(pos));
    }

  }
  // hologram
  else if (shakes < 750) {
    mode = "hologram"
    createCanvas(windth, height, webGL);
    x += accelerationX * 0.05;
    y += accelerationY * 0.05;
    z += accelerationZ * 0.05;

    rotateX(x);
    rotateY(y);
    rotateZ(z);

    noFill();

    stroke(99, 170, 159);
    box(200);
  }
}

class Sparkling {
  // 初期化（constructor＝コンストラクター＝建設者）
  constructor(pos) {
    // 花火本体の位置で初期化
    this.position = createVector(pos.x, pos.y);
    // 飛び散る向きをランダムに決める
    this.velocity = createVector(random(-3, 3), random(-3, 3)); // 速度

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
    fill(random(50, 150), 240, 230);
    ellipse(this.position.x, this.position.y, this.radius);
  }
}