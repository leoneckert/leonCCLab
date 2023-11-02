let confettis = [];
let numConfetti = 3;

let backgroundHue = 0;

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    for (let i = 0; i < numConfetti; i++) {
        confettis.push(new Confetti(width / 2, height / 2))
    }

    colorMode(HSB);
    backgroundHue = random(0, 360);

}

function draw() {
    background(backgroundHue, 10, 190);

    //   confettis.push(new Confetti(width/2, height/2)) 

    if(mouseIsPressed == true){
        for(let i = 0; i < numConfetti; i++){
            confettis.push(new Confetti(mouseX, mouseY)) 
        }
    }

      console.log(confettis.length)
    text("number of confettis in the array: " + confettis.length, 10, height-20);
    // console.log(  confettis[0].onCanvas  )

    for (let i = 0; i < confettis.length; i++) {
        confettis[i].update();
        confettis[i].checkOutOfCanvas();
        confettis[i].display();
    }

    // method 1
    // limit number of confetti
    // every time the number is bigger than
    // a certain threshold (20), we delte the oldest
    // confetti
    //   if(confettis.length > 20){
    //     let index = 0; // at which index to delete
    //     let numDelete = 1; // number of conffetis to delete
    //     confettis.splice(index, numDelete);
    //   }

    // method 2
    // deletes howeever many it takes to get back to
    // the threshold number
    // no matter how many confettis are added each loop 
    // their number will NEVER exceed the given threshold

    // while(confettis.length > 1000){
    //     let index = 0; // at which index to delete
    //     let numDelete = 1; // number of conffetis to delete
    //     confettis.splice(index, numDelete);
    //   }

    // method3
    // delete confetti once they leave canvas
    // loop backwards over confetti array
    for (let i = confettis.length-1; i >= 0; i--) {
        
        // for each confetti check if its on canvas
        if(confettis[i].onCanvas == false){
            // delete this confetti
            confettis.splice(i, 1);
        }

    } 




}



class Confetti {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.size = random(2, 10);
        this.speedX = random(-2, 2);
        this.speedY = random(-1, -3);

        this.hue = random(0, 360);

        this.onCanvas = true;
    }
    checkOutOfCanvas() {

        // vertical
        if (this.y > height) {
            this.onCanvas = false;
        }
        // horizontal
        if(this.x < 0 || this.x > width){
            this.onCanvas = false;
        }
    }
    update() {
        // apply speeds to position
        this.x += this.speedX;
        this.y += this.speedY;

        // slowly change speeds
        // y slowly turns downward (positive)
        this.speedY = this.speedY + 0.1;
        // x slowly turn towards 0
        this.speedX = this.speedX * 0.99;

    }
    display() {
        push();
        translate(this.x, this.y);
        fill(this.hue, 255, 255);
        noStroke();
        circle(0, 0, this.size);
        pop();
    }
}



// function mousePressed(){
//     for(let i = 0; i < numConfetti; i++){
//         confettis.push(new Confetti(mouseX, mouseY)) 
//     }
// }