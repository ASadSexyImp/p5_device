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
var x = 1;
var y = 1;
var z = 1;

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
    //draw 3d boxes and sphere
    push();
    rotateX(frameCount / 100);
    rotateY(frameCount / 100);
    rotateZ(frameCount / 100);
    box(300);
    pop();
    push();
    rotateX(-frameCount / 50);
    rotateY(frameCount / 100);
    rotateZ(frameCount / 100);
    box(200);
    pop();
    push();
    if (isShake) {
      scale(x, y, z);
    } else if (x > 1 && y > 1 && z > 1) {
      scale(0.999, 0.999, 0.999);
    }
    rotateX(-frameCount / 50);
    rotateY(frameCount / 100);
    rotateZ(frameCount / 100);
    box(100);
    pop();

    isShake = false;
  }


}

// shaken
function deviceShaken() {
  // shake count
  shakes++;
  // device is shaken
  isShake = true;
  background(0);
  fill(255);
  text(shakes, width / 2, height / 2);
  text(mode, width / 2, height / 2 + 200);
  // hello world
  if (shakes < 500) {
    mode = "helloworld";
  }
  // sparkling
  else if (shakes < 1000) {
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
  else if (shakes < 1500) {
    mode = "hologram"
    createCanvas(windth, height, webGL);
    x += accelerationX * 0.01;
    y += accelerationY * 0.01;
    z += accelerationZ * 0.01;

    noFill();

    stroke(99, 170, 159);
    background(20, 20, 45);
    box(200);
  }
  draw();
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