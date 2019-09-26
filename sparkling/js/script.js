// 振る回数カウント変数
var shakes = 0;
// 炭酸クラス変数
var sparklings = [];

function setup() {
  // キャンバス作成
  createCanvas(windowWidth, windowHeight);
  // 枠線を消す
  noStroke();
}

function draw() {
  // 背景作成
  background(255);

  // 炭酸制御
  for (var i = 0; i < sparklings.length; i++) {
    // 炭酸の寿命がなくなったら
    if (sparklings[i].lifetime < 0) {
      // 消えてしまう
      sparklings.splice(i, 1);
    } else {
      // 描画して移動する
      sparklings[i].draw();
      sparklings[i].move();
    }
  }
}

// 振ったら呼び出される関数
function deviceShaken() {
  // 炭酸を作る
  var pos = createVector(random(width), random(height));
  for (var i = 0; i < 15; i++) {
    // 炭酸配列に追加
    sparklings.push(new Sparkling(pos));
  }
}

// 炭酸クラス
class Sparkling {
  // コンストラクター
  constructor(pos) {
    // 位置を決める
    this.position = createVector(pos.x, pos.y);
    // 向きをランダムに決める
    this.velocity = createVector(random(-3, 3), random(-3, 3)); // 速度
    // 炭酸の粒の大きさを決める
    this.radius = random(5, 20);
    // 炭酸の粒が表示される時間をランダムに決める
    this.lifetime = random(120, 180);
  }

  // 移動
  move() {
    // 空気抵抗
    this.velocity.mult(0.98);
    // 速度で座標が変化する
    this.position.add(this.velocity);
    // 炭酸の寿命を減らす
    this.lifetime--;
  }

  // 表示
  draw() {
    // 円を描く
    fill(random(50, 150), 240, 230);
    ellipse(this.position.x, this.position.y, this.radius);
  }
}