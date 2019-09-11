var shakes = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(shakes);

  if (mouseIsPressed) {
    fill(255);
    ellipse(mouseX, mouseY, 50, 50);
  }


}

function deviceShaken() {
  shakes = shakes + 1;
  if (shakes > 255) {
    shakes = 0;
  }
}