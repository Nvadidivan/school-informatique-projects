"use strict"

let canvas;
let context;
let secondsPassed = 0;
let oldTimeStamp = 0;
let fps;
let timePassed = 0;
let gameObjects = []
let paddle = []
let key;
let thePaddle;
let lastX;
let game;
let gameNb;
let ballNb;

function init(){
    // Get a reference to the canvas
    canvas = document.getElementById("canvas");
    canvas.style.cursor = "none";
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.9;
    setGrid()
    context = canvas.getContext("2d");
    context.font = "400px pong";
    context.fillStyle = "#ffffff44";
    context.textAlign = "center";
    context.fillText("PONG", canvas.width/2, canvas.height/3*2);
    game = "start"
    setZen()
    createWorld()
    window.requestAnimationFrame(gameLoop);
}

class GameObject
{
    constructor (context, x, y, vx, vy){
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }
}

class Square extends GameObject
{
    constructor (context, x, y, vx, vy, size){
        super(context, x, y, vx, vy);

        // Set default width and height
        this.width = size;
        this.height = size;
        this.mass = size**2
        this.cx = (this.width / 2) + this.x
        this.cy = (this.height / 2) + this.y
        this.angle = Math.atan((this.height / 2) / (this.width / 2)) * 180 / Math.PI
    }

    draw(){
        // Draw a simple square
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        // Move with set velocity        
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        this.cx = (this.width / 2) + this.x
        this.cy = (this.height / 2) + this.y
    }
}

class Paddle extends GameObject
{
    constructor (context, x, y, vx, vy){
        super(context, x, y, vx, vy);

        // Set default width and height
        this.width = 200
        this.height = 40
        this.cx = (this.width / 2) + this.x
        this.cy = (this.height / 2) + this.y
        this.angle = Math.atan((this.height) / (this.width)) * 180 / Math.PI
        this.vfx = 0
        this.lastX = this.x
        
    }

    draw(){
        // Draw a simple square
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        // Move with set velocity
        this.vfx = (this.x - this.lastX) / secondsPassed
        this.lastX = this.x
        this.x += this.vx * secondsPassed

        this.cx = (this.width / 2) + this.x
    }
}

function createPaddle() {
    let x = 0
    let y = canvas.height
    thePaddle = (new Paddle(context, x, y, 0, 0))
    thePaddle.x = (canvas.width / 2) - thePaddle.width/2;
    thePaddle.y = canvas.height - thePaddle.height
}

function createWorld(){
    if (game != "zen" && game != "start") {
        createPaddle()
    }
    for (let i = 0; i < 2; i++) {
        createSquare()
    }
}

function createSquare() {
    let options = filterOptions()
    shuffleGrid(options)
    let row = options.pop()
    shuffleGrid(row)
    let location = row.pop()
    let x = location[1] * 20
    let y = location[2] * 20
    let size = location[3]

    let long;
    if (size == 1) {
        long = 40
    } else if (size == 2) {
        long = Math.trunc((Math.random() * (60 - 40 + 1) + 40)/10) * 10;
    } else if (size == 3) {
        long = Math.trunc((Math.random() * (80 - 40 + 1) + 40)/10) * 10
    } else {
        console.log(size)
        console.log("ERROR")
        console.log(error)
    }
    console.log(long)

    let colliding = false
    let xDir;
    let yDir;
    if (Math.random() < 0.5) {
        xDir = -1
    } else {
        xDir = 1
    }
    if (Math.random() < 0.5) {
        yDir = -1
    } else {
        yDir = 1
    }
    let vx = (Math.random() + 0.5) * 200 * xDir
    let vy = (Math.random() + 0.5) * 200 * yDir
    if (checkOccupied(x, y, long, long)) {
        colliding = true
    }
        /*for (let i = 0; i < gameObjects.length; i++) {
            let obj2 = gameObjects[i]
            if (rectIntersect(x - size/10, y - size/10, size + size/10, size + size/10, obj2.x, obj2.y, obj2.width, obj2.height)) {
                colliding = true
                createSquare()
            }
        }*/
    if (colliding == false) {
        gameObjects.push(new Square(context, x, y, vx, vy, long))
    } else {
        console.log("sad")
        createSquare()
    }
}