console.log("js is linked!");

function setup(){   
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvasWrapper");
    
}

function draw(){
    background(0);

    push();
    translate(550, 610);
    scale(0.5)
    fill(255);

    textSize(40);
    text("ON DISPLAY:", 0,0)


    textSize(120);
    text("ANGY HE &", 0,150)
    text("SHENGYANG PENG", 0,290)
    textSize(50);
    text("WHAT REMAINS OF ARTEMISIA GENTILESCHI?", 0,420);
    pop();
}