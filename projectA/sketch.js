console.log("js is linked!");

// let circleX = 0;
let car1x = 0;
let car2x = 0;


function setup(){   
    let cnv = createCanvas(windowWidth, 400);
    cnv.parent("canvasWrapper");
    
}

function draw() {
    background(220);
  
    
    // car 1
    drawCar(car1x, height/2, 4, "police 👮‍♀️");
    
    // car 2
    drawCar(car2x, height/2, 20, "gangster");
    
    
    
    car1x += 2;
    if(car1x > width+100){
      car1x = -100; // to make sure it doesnt pop in half-way
    }
    
    car2x += 8;
    if(car2x > width+100){
      car2x = -100; // to make sure it doesnt pop in half-way
    }
    
  
  }
  
  // defining a function
  function drawCar(xPos, yPos, speed, name){
    push();
    translate(xPos, yPos);
    // scale(0.6)
    
      // light
      fill("blue");
      ellipse(-10, -40, 10, 20)
  
      // body
      fill(0);
      rect(-20, -40, 40, 40);
      rect(-60, 0, 120, 40);
  
      // decoration
      fill("red");
      rect(-60, 20, 120, 5);
      fill("blue");
      rect(-60, 25, 120, 5);
    
      fill(255);
      textSize(20)
      text(name, -50, 20)
  
      // wheels
      fill(0);
      // circle(-25, 40, 30);
      // circle(25, 40, 30);
      drawWheel(-25, 40, speed)
      drawWheel( 25, 40, speed)
  
      // little red helper cirlce
      // to illustrate the origin:
      // fill("red");
      // circle(0, 0, 5);
    pop();
    
  }
  
  
  function drawWheel(xPos, yPos, speed){
    push();
    translate(xPos, yPos);
    rotate( radians( frameCount * speed ) );
    
      fill(50);
      // circle(0, 0, 30);
      ellipse(0, 0, 35, 32);
  
      // // to illustrate the origin:
      // fill("red");
      // circle(0, 0, 5);
    pop();
  }
  
  
  
  
  