// open the side view and see style.css file.

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvasWrapper");
  background(0)
}

function draw() {
  noStroke();
  fill(random(255), random(255), random(255));
  ellipse(random(width), random(height), 60, 60);
}