var img;
var NUM = 60;
var x = [];
var y = [];
var r = [];
var colg;
var colb;

var shakes = 0;

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
  frameRate(10);
  background(0);
  for (var i = 0; i < NUM; i++) {
    x[i] = 0;
    y[i] = random(10, height - 10);
    r[i] = random(10, 100);
  }
}

function draw() {


}

// shaken
function deviceShaken() {
  for (var i = 0; i < NUM; i++) {
    colg = map(x[i], 0, 500, 50, 150);
    colb = map(y[i], 0, 500, 50, 150);
    fill(random(200, 250), colg, colb, 50);
    noStroke();
    ellipse(x[i], y[i], r[i]);
    x[i] = x[i] + random(10);
    y[i] = y[i] + random(-5, 5);
  }
  image(img, 0, 0);
}