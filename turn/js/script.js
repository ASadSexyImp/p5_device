var count = 0;
var status = "front";

function setup() {
  textAlign(CENTER);
  textSize(100);
}

function draw() {
  background(0);

  text(count, width / 2, height / 2);
}

function deviceTurned() {
  fill(random(255), random(255), random(255));

  if (status == "front") {
    status = "back";
    count++;
  } else {
    status = "front";
  }
}