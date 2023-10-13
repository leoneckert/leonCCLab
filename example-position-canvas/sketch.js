// open the side view and see style.css file.

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvasWrapper");
  background(255)
}

function draw() {
  
  noStroke();
  fill(random(255), random(255), random(255));
  ellipse(random(width), random(height), 30, 30);
}