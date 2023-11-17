console.log("js is linked!");

// making a global variable for 
// images and sounds we load
// why global?
// becauyse we want to LOAD the sound inn preload
// but then USE the sound in draw or other function
// --> use anything in multiple function, make it global!
let backgroundImage;

let karateChop;
let readyToChop = true;

// let fruit1;
let fruitBasket = []; // emtpy array that will hold fruits
let numFruits = 3; // initial number of fruits

let cherriesImage;

let fruitImageArray = [];
let numFruitsImages = 3;

function preload(){
    karateChop = loadSound("sounds/karate.m4a");
    backgroundImage = loadImage("images/gradient-bkg.png");

    cherriesImage = loadImage("images/fruit0.png");

    for(let i = 0; i < numFruitsImages; i++){
        let path = "images/fruit"+i+".png";
        console.log(path);
        let img = loadImage(path);
        fruitImageArray.push(img);
    }
    console.log(fruitImageArray)
}

function setup(){   
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    // fruit1 = new Fruit(width/2, height/2, cherriesImage);
    for(let i = 0; i < numFruits; i++){
        let ran = floor(random(0,3))
        let singleFruit = new Fruit(random(width), random(height), fruitImageArray[ran]); 
        fruitBasket.push(singleFruit);
    }
    
}

function draw(){
    background(0, 50);
    image(backgroundImage, 0, 0, 400, 400);


    let distance = dist(pmouseX, pmouseY, mouseX, mouseY);

    if(mouseIsPressed == true){
        // distance between current mouse position and
        // mouse position in previsou frame
        if(distance > 30 && readyToChop == true){
            karateChop.play();
            readyToChop = false;
        }else if(distance < 10){
            readyToChop = true;
        }
        stroke(255)
        line(pmouseX, pmouseY, mouseX, mouseY)
        // circle(mouseX, mouseY, 5)

    }
    
    // displaying number just while
    // i code to understand my logic better
    fill(255);
    text(distance, 100, 100);


    // fruit section 
    // fruit1.display();
    for(let i = 0; i < fruitBasket.length; i++){
        fruitBasket[i].display();
    }

}

function mousePressed(){
    // karateChop.play();
}


class Fruit{
    constructor(startX, startY, fruitImg){
        this.x = startX;
        this.y = startY;

        this.img = fruitImg;
    }
    display(){
        push();
        translate(this.x, this.y);

        circle(0, 0, 50)

        image(this.img, -25, -25, 50, 50)
        
        pop();
    }
}
