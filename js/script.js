var img;
var NUM = 600;
var x = [];
var y = [];
var r = [];
var colr;
var colb;

// var shakes = 0;

function preload() {
  img = loadImage('helloworld.png');
}

function setup() {
  // stop scroll horizonall direction
  window.addEventListener("touchstart", function (event) {
    event.preventDefault();
  }, {
    passive: false
  });
  window.addEventListener("touchmove", function (event) {
    event.preventDefault();
  }, {
    passive: false
  });

  createCanvas(windowWidth, windowHeight);

  // prepare to background
  frameRate(60);
  background(0);
  for (var i = 0; i < NUM; i++) {
    x[i] = 0;
    y[i] = random(height / 2 - 200, height / 2 + 200);
    r[i] = random(10, 30);
  }
  imageMode(CENTER);
}

function draw() {
  for (var i = 0; i < NUM; i++) {
    colr = map(x[i], 0, 500, 50, 150);
    colb = map(y[i], 0, 500, 50, 150);
    fill(colr, random(200, 250), colb, 50);
    noStroke();
    ellipse(x[i], y[i], r[i]);
    x[i] = x[i] + random(10);
    y[i] = y[i] + random(-5, 5);
  }
  image(img, width / 2, height / 2);
}

// shaken
function deviceShaken() {
  for (var i = 0; i < NUM; i++) {
    colr = map(x[i], 0, 500, 50, 150);
    colb = map(y[i], 0, 500, 50, 150);
    fill(colr, random(200, 250), colb, 50);
    noStroke();
    ellipse(x[i], y[i], r[i]);
    x[i] = x[i] + random(10);
    y[i] = y[i] + random(-5, 5);
  }
  image(img, width / 2, height / 2);
}