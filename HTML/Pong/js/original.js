"use strict"

let undo = ["Enter", "a", "b", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp"]
let present = 0;
let paddles = []
let square;
let leftUp = false;
let rightUp = false;
let leftDown = false;
let rightDown = false;
let p1 = 0;
let p2 = 0;
let timePassed = 0;
let oldTime = 0;


function initOriginal() {
    gameObjects = []
    stopZen()
    grid = []
    document.getElementById("canvas").style.left = "0"
    document.getElementById("canvas").style.right = "0"
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    game = "original"
    p1 = 0
    p2 = 0
    window.removeEventListener('keydown', konamiCode);
    window.removeEventListener("keydown", keyPress)
    window.addEventListener('keydown', Konami);
    window.addEventListener('keyup', stopPaddles);
    startOriginal()
    window.requestAnimationFrame(originalGameLoop);
}

function stopOriginal() {
    window.removeEventListener('keydown', Konami);
    window.removeEventListener('keyup', stopPaddles);
    document.getElementById("canvas").style.left = "10%"
    document.getElementById("canvas").style.right = "10%"
    document.getElementById("square").classList.remove("hidden")
    init()
}


function originalGameLoop(timeStamp)
{
    if (game == "original") {
        timePassed = (timeStamp - oldTime) / 1000;
        oldTime = timeStamp;
        timePassed = Math.min(timePassed, 0.1)
    
        checkCollision()
    
        for (let i = 0; i < 2; i++) {
            paddles[i].update()
        }
        square.update()
    
        context.clearRect(0, 0, canvas.width, canvas.height);
    
        context.fillStyle = "black"
        context.fillRect(0, 0, canvas.width, canvas.height)
    
        context.strokeStyle = "white";
        context.setLineDash([5, 10]);
        context.beginPath();
        context.moveTo(canvas.width/2, 0)
        context.lineTo(canvas.width/2, canvas.height)
        context.stroke()

        context.fillStyle = "white";
        context.font = "126px pong"
        context.fillText(p1, canvas.width*0.3, canvas.height*0.2)
        context.fillText(p2, canvas.width - canvas.width*0.3 - context.measureText(p2).width, canvas.height*0.2)
    
        square.draw()    
        for (let i = 0; i < 2; i++) {
            paddles[i].draw()
        }

        window.requestAnimationFrame(originalGameLoop);
    }
}

function Konami(e)  {
    if (e.key == undo[present]) {
        present++
        if (present == undo.length) {
            console.log("html")
            stopOriginal()
        }
    } else {
        present = 0

        if (e.key == "ArrowUp") {
            rightUp = true
            movePaddles(1, "up", true)
        } else if (e.key == "ArrowDown") {
            rightDown = true
            movePaddles(1, "down", true)
        }
        if (e.key == "w") {
            leftUp = true
            movePaddles(0, "up", true)
        } else if (e.key == "s") {
            leftDown = true
            movePaddles(0, "down", true)
        }
    }
    console.log(present)
}

class originalSquare extends GameObject
{
    constructor (context, x, y, vx, vy){
        super(context, x, y, vx, vy);

        // Set default width and height
        this.width = 35;
        this.height = 35;
    }

    draw(){
        // Draw a simple square
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(){
        // Move with set velocity        
        this.x += this.vx * timePassed;
        this.y += this.vy * timePassed;
        
    }
}

class originalPaddle extends GameObject
{
    constructor (context, x, y, vx, vy){
        super(context, x, y, vx, vy);

        // Set default width and height
        this.width = 30
        this.height = 150
        
    }

    draw(){
        // Draw a simple square
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(){
        // Move with set velocity
        this.y += this.vy * timePassed
    }
}

function startOriginal() {
    paddles.push(new originalPaddle(context, 0, canvas.height, 0, 0))
    paddles.push(new originalPaddle(context, 0, canvas.height, 0, 0))
    paddles[0].x = canvas.width * 0.1
    paddles[0].y = (canvas.height / 2) - paddles[0].height/2;
    paddles[1].x = canvas.width * 0.9 - paddles[1].width
    paddles[1].y = (canvas.height / 2) - paddles[1].height/2;
    square = (new originalSquare(context, 0, canvas.height, 0, 0))
    startSquare()
    
}

function startSquare() {
    square.vx = ((Math.random()/4) + 0.75) * (400 * Math.sign(Math.random()- 0.5))
    square.vy = ((Math.random()/4) + 0.75) * (200 * Math.sign(Math.random()- 0.5))
    square.x = (canvas.width/2) - (square.width/2)
    square.y = (canvas.height/2) - (square.height/2)
    console.log(Math.sign(Math.random()- 0.5))
    console.log(square.vx)
}


function checkCollision() {
    if (square.y <= 2 || square.y >= canvas.height - square.height - 2) {
        square.vy *= -1
    }
    for (let i = 0; i < 2; i++){
        if (square.x + square.width >= paddles[i].x && square.x <= paddles[i].x + paddles[i].width && square.y + square.height >= paddles[i].y && square.y <= paddles[i].y + paddles[i].height) {
            square.vx *= -1
            square.update(timePassed)
        }
    }
    if (square.x + square.width <= 2) {
        p2++
        startSquare()
    } else if (square.x >= canvas.width - 2) {
        p1++
        startSquare()
    }

}

function movePaddles(nb, dir, state) {
    if (state) {
        console.log(nb)
        if (dir == "up") {
            paddles[nb].vy = -400
        } else if (dir == "down") {
            paddles[nb].vy = 400
        }
    } else {
        paddles[nb].vy = 0
    }
    for (let i = 0; i < 2; i++) {
        if(paddles[i].y <= 0 && paddles[i].vy < 0) {
            paddles[i].vy = 0
            paddles[i].y = 0
        } else if(paddles[i].y + paddles[i].height >= canvas.height && paddles[i].vy >= 0) {
            paddles[i].vy = 0
            paddles[i].y = canvas.height - paddles[i].height
        }
    }
}

function stopPaddles(e) {
    if (e.key == "ArrowUp") {
        rightUp = false
        movePaddles(1, "up", false)
    } else if (e.key == "ArrowDown") {
        rightDown = false
        movePaddles(1, "down", false)
    }
    if (e.key == "w") {
        leftUp = false
        movePaddles(0, "up", false)
    } else if (e.key == "s") {
        leftDown = false
        console.log(timePassed)
        movePaddles(0, "down", false)
    }
}