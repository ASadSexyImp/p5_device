var shakes = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(shakes);

  // mouse move
  if (mouseIsPressed) {
    fill(255);
    ellipse(mouseX, mouseY, 50, 50);
  }

}

// shaken
function deviceShaken() {
  shakes = shakes + 1;
  if (shakes > 255) {
    shakes = 0;
  }
}