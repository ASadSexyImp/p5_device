var x = 1,
  y = 1,
  z = 1;
var isShake = false;

function setup() {
  createCanvas(600, 600, WEBGL);
  stroke(220, 220, 255, 100);
  noFill();
}

function draw() {
  background(20, 20, 45);
  drawObject();
}

function drawObject() {
  push();
  translate(0, 0, 0);
  if (isShake) {
    scale(x, y, z);
  } else if (x > 1 && y > 1 && z > 1) {
    scale(0.999, 0.999, 0.999);
  }
  rotateX(-frameCount / 50);
  rotateY(frameCount / 100);
  rotateZ(frameCount / 100);
  box(300);
  pop();

  isShake = false;
}

function deviceShaken() {
  isShake = true;
  x += accelerationX * 0.01;
  y += accelerationY * 0.01;
  z += accelerationZ * 0.01;
}