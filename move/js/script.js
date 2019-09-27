function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  textSize(20);
}

function deviceMoved() {
  background(random(255), random(255), 255);
  text('I WAS MOVED!', width / 2, height / 2);
}

// add these lines below to sketch to prevent scrolling
function mousePressed(e) {
  return false;
}

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});