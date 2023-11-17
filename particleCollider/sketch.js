console.log("js is linked!");

// array that will hold ALL of the atoms
let atoms = [];
// number of atoms we want initially!
let numAtoms = 3;


let fruitImages = [];

let gongSound;
// using a boolean to assutre peopl first have to click 
// the canvas to make the sound work (sounds in web only work after interaction)
// i use it at the top of draw and at the veeeery end of 
// this script in mousePressed, check both places to understand
// the logic
let notClickedToStart = true;

function preload(){
    // let img = loadImage(IMAGE_PATH);
    for(let i = 0; i < 3; i++){
        let path = "images/fruit"+i+".png";
        console.log(path);
        fruitImages[i] = loadImage(path);
    }

    // load sound
    gongSound = loadSound("sounds/gong.wav");
   
}



function setup(){   
    let cnv = createCanvas(windowWidth, 400);
    cnv.parent("canvasWrapper");

    for(let i = 0; i < numAtoms; i++){
        let ran = floor(random(0, 3));
        // let ran = random([0, 1, 2])
        atoms.push( new Atom(fruitImages[ran], gongSound) )
    }
    console.log(atoms);

    rectMode(CENTER);

}

function draw(){
    background(0);

    // sound onluy works after click
    // i use this boolean to guarantee that they first click
    if(notClickedToStart == true){
        fill(255);
        text("click to start", 100, 100)
        return
    }

    if(random()<0.02){
        let ran = floor(random(0, 3));
        atoms.push( new Atom(fruitImages[ran], gongSound) )
    }


    // do all the atom activities
    // all the things gthat EVERY SINGLE atom should
    // do once a frame happen inside this loop
    for(let i = 0; i < atoms.length; i++){
        // console.log("i is ", i);

        let currentAtom = atoms[i];
        currentAtom.display();
        currentAtom.fly();
        currentAtom.checkIfOnCanvas();
        // currentAtom.checkIfTouched(mouseX, mouseY);
        // loop again over all atoms and check if any of them touches
        // the current atom[i]

        // before we check if the atom is touched by another
        // we set it to 'not being touched':
        currentAtom.isTouched = false;
        // now we looop over the other atoms to check if any of them collides
        // with the current one:
        for(let j = 0; j < atoms.length; j++){
            // we only want to check the other atoms
            // if (1) they aren't the same as the current one (i!=j)
            // and (2) they aren't touched yet (as soon as they are
            // touched by at least on atom, we have no reasons to go on
            // checking since we don't care about how many other atoms are
            // touching)
            if(i != j && currentAtom.isTouched == false){
                // only check for OTHER atoms, 
                // not for the current atom itself
                // console.log("    j is ", j);
                let otherAtom = atoms[j];
                let otherX = otherAtom.x;
                let otherY = otherAtom.y;
                // console.log("    otherX:", otherX);
                // console.log("    otherY:", otherY);
                currentAtom.checkIfTouched(otherX, otherY);
            }
            



        }
    }

    // delete atom that are far away from the canvas

    for(let i = atoms.length-1; i >=0; i--){
        let currentAtom = atoms[i];
        if(currentAtom.isOnCanvas == false){
            atoms.splice(i, 1);
        }
    }



    fill(255);
    text(atoms.length, 200, 100)


}

class Atom{
    // previously:
    // constructor(startX, startY){
    // noticed we don't need startX and strartY
    // parameter because we never need to 
    // position an atom precisely at a certain
    // spot but always generate their position at random:
    constructor(fruitImage, gongSound){

        this.img = fruitImage;
        this.sound = gongSound;
        // i don't define this.x up here
        // but do it further below after having picked 
        // the atom's direction:
        // this.x = width/2;
        this.y = random(0, height);
        this.size = 40;
        this.speed = random(4, 7);
        this.speedY = 0;
        // this.direction = random(  -1, 1 ); // pick value between -1 and 1
        this.direction = random( [-1, 1] ); // picks either -1 or 1
       
        // after picked the direction
        // i can now define the initial this.x location
        if(this.direction == -1){
            // if flying left, start at the right
            this.x = width + 100;
        }else{
            // if flying right, start at the left
            this.x = -100;
        }

        this.isTouched = false;
        this.isOnCanvas = true; // is too far away, should be deleted

    }
    display(){
        push();
        translate(this.x, this.y);

        if(this.isTouched == true){
            fill("red");
        }else{
            fill(255)
        }

        // rememeber we switched to rectMode(CENTER)
        // in the setup function, that's why this rect
        // will be drawn from its center and right 
        // on top of the atom's this.x, this.y
        // rect(0, 0, this.size, this.size);
        
        // fruit image is to big
        // we want to scale it down
        // therefore we use push and pop 
        // to contain scale's effect to only the fruit 
        // image
        push();
            scale(0.1); // 
            image(this.img, -this.img.width/2, -this.img.height/2);
        pop();

        // helper dot:
        fill("red");
        // circle(0, 0, 5);
        pop();
    }
    fly(){
        // this.x changes by atom's speed 
        // with regards to its direction:
        this.x += this.speed*this.direction;
        this.y += this.speedY;

    }
    checkIfTouched(otherX, otherY){
        // bigger than left edge, smaller than right edge      bigger than upper edge, smaller than lower edge 
        let leftEdge = this.x - this.size/2;
        let rightEdge = this.x + this.size/2;
        let upperEdge = this.y - this.size/2;
        let lowerEdge = this.y + this.size/2;

        // check if the x and y pair (otherX and otherY) that 
        // was passed in to this function
        // is colliding with this atom:
        if(otherX > leftEdge && otherX < rightEdge && otherY > upperEdge && otherY < lowerEdge){
            // if all four conditions are met, a collision occurred 
            this.isTouched = true;
            this.sound.play();
            this.speedY = random(10, 20) * random([-1, 1]);
        }else{
            this.isTouched = false;
        }
    }
    checkIfOnCanvas(){
        if(this.x < -500 || this.x > width+500){
            this.isOnCanvas = false;
        }
    }
    


}


function mousePressed(){
    notClickedToStart = false
}