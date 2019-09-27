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
  if (isShake) {
    scale(x, y, z);
  } else if (x > 1 && y > 1 && z > 1) {
    scale(0.999, 0.999, 0.999);
  }
  rotateX(-frameCount / 50);
  rotateY(frameCount / 100);
  rotateZ(frameCount / 100);
  box(200);
  pop();

  isShake = false;
}

function deviceShaken() {
  isShake = true;
  x += accelerationX;
  y += accelerationY;
  z += accelerationZ;
}