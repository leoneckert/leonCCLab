let instanceOfTaxi;
let secondTaxi;


function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");
    
    // create instance of taxi class 
    // and stores it in variable "instanceOfTaxi"
    instanceOfTaxi = new Taxi(100, 200, 1); 
    secondTaxi = new Taxi(300, 200, 0.5);

}

function draw() {
  background(90, 120, 250);

  instanceOfTaxi.display();
  instanceOfTaxi.update();

  secondTaxi.display();
  secondTaxi.update();
 
}

class Taxi {
  // every class MUST have a constructor function
  // it's call automatically when instances oif the class
  // are created
  constructor(startX, startY, s){
    // inside, we list and define the class's properties 
    this.x = startX;
    this.y = startY; 
    this.scaleFactor = s;
    this.w = 100; //width
    this.speed = random(-2, 2);
    this.col = [120, 150, 90]; //r g b in array
  }
  display(){
    // here we actually draw the thing using property value

    // always a good idea to 
    // use push translate pop
    // to make everything be drawn in reference
    // to the class's location
    push();
    translate(this.x, this.y);
    // different instances will have different scales
    scale(this.scaleFactor);

    fill(this.col[0], this.col[1], this.col[2]);
    rect(0, 0, this.w, 30);

    pop();
  }
  update(){
    // here we will change property values
    this.x = this.x + this.speed;

    this.reappear();
    
  }
  reappear(){
    if(this.x > width){
      // moving to right
      this.x = -this.w*this.scaleFactor;
    }else if(this.x < -this.w*this.scaleFactor){
      // moving to left
      this.x = width;
    } 
  }

}