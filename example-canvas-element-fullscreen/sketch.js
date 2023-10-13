// open the side view and see index.html and style.css files.

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("canvasWrapper");
  background(255)
}

function draw() {
  noStroke();
  fill(random(255), random(255), random(255), 30);
  ellipse(random(width), random(height), 200, 200);
}