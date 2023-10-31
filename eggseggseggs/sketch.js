let basket = [];
let notYetTouched = true;
let minScale = 0.4;
let maxScale = 1.5;
function setup() {
  let cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.parent("canvasWrapper");
  basket[0] = new Egg(random(width), random(height), random(minScale, maxScale));
  basket[1] = new Egg(random(width), random(height), random(minScale, maxScale));
  
  let newEgg = new Egg(random(width), random(height), random(minScale, maxScale));
  
  basket.push(newEgg);
}

function draw() {
  background(120, 90, 230);
  
  for(let i = 0; i < basket.length; i++){
    basket[i].update();
    basket[i].display();
  }
  if(notYetTouched){
    textAlign(CENTER);
    textSize(30);
    text("👆 to add more 🥚", width/2, height/2)
  }
}

class Egg{
  constructor(startX, startY, scaleFactor){
    this.x = startX;
    this.y = startY;
    this.s = scaleFactor;
    this.xSpeed = random(-1.5, 1.5);
    this.ySpeed = random(-1.5, 1.5);
    this.showYolk = false;
  }
  update(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if(this.x > width || this.x < 0){
      this.xSpeed *= -1;
      this.showYolk = !this.showYolk;
    }
    if(this.y > height || this.y < 0){
      this.ySpeed *= -1;
      this.showYolk = !this.showYolk;
    }
  }
  display(){
    push();
    translate(this.x, this.y);
    scale(this.s)
      noStroke();
      // egg white:
      fill(255, 200);
      arc(0, 0, 80, 80,  0,  PI);
      arc(0, 0, 80, 130, PI, 2*PI);
    
      if(this.showYolk == true){
        // egg yolk:
        fill(255,164,0);
        circle(0, 0, 40);
      }
      
    pop();
  }
}


function mousePressed(){
  notYetTouched = false;
  let newEgg = new Egg(mouseX, mouseY, random(minScale, maxScale));
  basket.push(newEgg);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
function touchStarted(){
  notYetTouched = false;
  let newEgg = new Egg(mouseX, mouseY, random(minScale, maxScale));
  basket.push(newEgg);
}

setTimeout(()=>{
  windowResized();
}, 500)
