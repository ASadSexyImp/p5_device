// https://editor.p5js.org/dano/sketches/Sk1UY7tee のコードを元にしています

// カラー配列変数
var colors;

function setup() {
  // キャンバス作成
  createCanvas(windowWidth, windowHeight);
  // 背景作成
  background(200);
  // カラー配列に入れる
  colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0), color(0, 255, 255)];
  strokeWeight(20);
}

function draw() {
  // タッチの分だけ
  for (var i = 0; i < touches.length; i++) {
    // 色つける
    fill(colors[i]);
    stroke(colors[i]);
    // 円を描く
    ellipse(touches[i].x, touches[i].y, 20);
    if (i > 0) {
      line(touches[i].x, touches[i].y, touches[i - 1].x, touches[i - 1].y);
    }
  }
}

// スクリーンが動くのを防ぐ
function touchMoved() {
  return false;
}