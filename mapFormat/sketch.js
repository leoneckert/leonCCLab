console.log("js is linked!");

let thingsArray = [];
let numThings = 20;

let sceneWidth = 800;
let sceneHeight = 800;
let sceneX = 0;
let sceneY = 0;

function setup(){   
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");
    colorMode(HSB);

    for(let i = 0; i < numThings; i++){
        let t = new Thing(random(sceneWidth), random(sceneHeight));
        thingsArray.push(t)
    }
}

function draw(){
    background(0);

    // translate for the entire scene
    push();
    translate(sceneX, sceneY);

        // scene outline
        stroke(255);
        noFill();
        rect(0, 0, sceneWidth, sceneHeight)

        // anything in here will move with the scene
        for(let i = 0; i < thingsArray.length; i++){
            thingsArray[i].update();
            thingsArray[i].display();

        }



    pop();

    // outside of the scene I can draw stuff that should remain steady
    fill(255);
    circle(width/2, height/2, 30)

    // move scene
    if(keyIsPressed == true){
        if(key == "ArrowLeft"){
            sceneX+=2;
        }else if(key == "ArrowRight"){
            sceneX-=2;
        }else if(key == "ArrowUp"){
            sceneY+=2;
        }else if(key == "ArrowDown"){
            sceneY-=2;
        }

        // prevent from stepping over scene bvoundaries:
        if(sceneX < -sceneWidth+width/2){
            sceneX = -sceneWidth+width/2;
        }
        // console.log(sceneX, -sceneWidth+width/2)
    }

}

class Thing{
    constructor(startX, startY){
        this.x = startX;
        this.y = startY;

        this.c = color(random(360), 255, 255);

    }
    display(){
        push();
        translate(this.x, this.y);

        
        fill(this.c);
        circle(0, 0, 10)

        pop();
    }
    update(){
        this.x+=random(-1, 1);
        this.y+=random(-1, 1);
    }
}

