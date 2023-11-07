let faces = [];
let numFaces = 20;

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    for (let i = 0; i < numFaces; i++) {
        faces.push(new Face(random(width), random(height)));
    }

}

function draw() {
    background(180);

    if(random(0, 100) < 1 && faces.length < 400){
        faces.push(new Face(random(width), random(height)));
    }

    for (let i = 0; i < faces.length; i++) {
        faces[i].update();
        faces[i].display();
    }

    // // all face turn angry at the same time
    // // maybe a bad global event happened
    // if(frameCount > 100){
    //     for (let i = 0; i < faces.length; i++) {
    //         faces[i].turnAngry();
    //     }
    // }

    for(let i = faces.length-1; i >= 0; i--){
        if(faces[i].shouldDisappear == true){
            faces.splice(i, 1);
        }
    }

  




}

class Face {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.offsetX = 0;

        this.angleForSineRadians = random(0, 2*PI);

        // list of possible color
        this.normalColor = color(220, 250, 90);
        this.angryColor = color(255, 90, 29);

        // initial color:
        this.c = this.normalColor;

        this.speed = random(0.01, 0.1);

        this.age = 0;
        this.ageToTurnAngry = random(15, 55);

        this.r = 25;

        this.shouldDisappear = false; 
        this.isAngry = false;
        this.timeSinceAngry = 0;

    }
    update() {
        this.offsetX = map(sin(this.angleForSineRadians), -1, 1, -20, 20);

        this.angleForSineRadians += this.speed;

        this.age+=0.2;

        // if(this.age > this.ageToTurnAngry){
        //     this.turnAngry();
        // }

        if(this.isAngry == true){
            this.timeSinceAngry++;
            this.r++;
            this.speed+=0.5;
        }
        if(this.timeSinceAngry > 50){
            this.shouldDisappear = true;
        }

    }
    display() {
        push();
        translate(this.x + this.offsetX, this.y);

        noStroke();
        fill(this.c);
        circle(0, 0, this.r*2);
        fill(0);
        circle(-10, -10, 5)
        circle(10, -10, 5)
        ellipse(0, 10, 8, 9)

        // for debugging
        // text(floor(this.timeSinceAngry), 0, 0)

        pop();
    }
    turnAngry(){
        this.c = this.angryColor;
    }
    turnNormal(){
        this.c = this.normalColor;
    }
    checkIfClicked(){
        // 1.distance between mouse and face
        let distanceMouseFace = dist( mouseX, mouseY, this.x, this.y);

        // 2. if distance is smaller than face radius
        // that means I was clicked and turn angry
        if(distanceMouseFace < this.r){
            this.turnAngry();
            this.isAngry = true;
        }

        // // if the face was a rectangle
        // // we would detect the click differently
        // // like this:
        // if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){

        // }


    }


}


function mousePressed(){

    // // everybody angry :(
    // for (let i = 0; i < faces.length; i++) {
    //     faces[i].turnAngry();
    // }


    // faces.push(new Face(mouseX, mouseY));

    for (let i = 0; i < faces.length; i++) {
        faces[i].checkIfClicked();
    }



}