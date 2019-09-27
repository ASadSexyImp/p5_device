var x = 1,
  y = 1,
  z = 1;

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
  rotateX(-frameCount / 50);
  rotateY(frameCount / 100);
  rotateZ(frameCount / 100);
  box(200);
  pop();
}

function deviceShaken() {
  stroke(random(255), random(255), random(255));
}