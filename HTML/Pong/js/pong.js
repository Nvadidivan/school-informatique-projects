"use strict"

let canvas;
let context;
let secondsPassed = 0;
let oldTimeStamp = 0;
let fps;
let timePassed = 0;
let gameObjects = []
let paddle = []

window.onload = init;

function init(){
    // Get a reference to the canvas
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight - 75;
    context = canvas.getContext("2d");
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
    constructor (context, x, y, vx, vy, length){
        super(context, x, y, vx, vy);

        // Set default width and height
        this.width = length;
        this.height = length;
        this.mass = length * length
        this.cx = (this.width / 2) + this.x
        this.cy = (this.height / 2) + this.y
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
    }

    draw(){
        // Draw a simple square
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        // Move with set velocity
        let x = this.x
        this.x += this.vx * secondsPassed

        this.cx = (this.width / 2) + this.x
    }
}

function createWorld(){
    let x = (canvas.width / 2) - 150
    let y = canvas.height - 40
    paddle.push(new Paddle(context, x, y, 50, 0))
    console.log(paddle[0])
    for (let i = 0; i < Math.random() * 20; i++) {
        createSquare()
    }
}

function createSquare() {
    let x = Math.random() * canvas.width - 80
    let y = Math.random() * canvas.height / 2
    let vx = (Math.random() - 0.5) * 500
    let vy = (Math.random() - 0.5) * 500
    let length = (Math.random() * 40) + 40
    if (x <= 0 || y <= 0 || vx <= 0 || vy <= 0 || length <= 0) {
        createSquare()
    } else {
        let colliding = false
        for (let i = 0; i < gameObjects.length; i++) {
            let obj2 = gameObjects[i]
            if (rectIntersect(x, y, length, length, obj2.x, obj2.y, obj2.width, obj2.height)) {
                colliding = true
                createSquare()
            }
        }
        if (colliding == false) {
            gameObjects.push(new Square(context, x, y, vx, vy, length))
        }
    }
}

function gameLoop(timeStamp)
{
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Move forward in time with a maximum amount
    secondsPassed = Math.min(secondsPassed, 0.1);

    // Loop over all game objects
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].update(secondsPassed);
    }

    detectCollisions()
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.strokeStyle = "white";
    context.setLineDash([5, 10]);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvas.width, 0);
    context.lineTo(canvas.width, canvas.height);
    context.moveTo(0, canvas.height)
    context.lineTo(0, 0)
    context.stroke()


    paddle[0].draw()   

    // Do the same to draw
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].draw();
    }

    window.requestAnimationFrame(gameLoop);
}

function detectCollisions(){
    let obj1;
    let obj2;

    // Start checking for collisions
    for (let i = 0; i < gameObjects.length; i++)
    {
        obj1 = gameObjects[i];

        if (wallCollision(obj1.x, obj1.y, obj1.width, obj1.height) == 1) {
            obj1.vx = obj1.vx * -1
        } else if (wallCollision(obj1.x, obj1.y, obj1.width, obj1.height) == 2) {
            obj1.vy = obj1.vy * -1
        }

        obj2 = paddle[0];

        if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
            console.log("gg" + obj2.cx)
            console.log("Ww" + paddle[0].cx)



            let maybeVX = (obj1.vx + obj2.vx) * -1

            let v = Math.sqrt((obj1.vx*obj1.vx) + (obj1.vy*obj1.vy));


            let vCollision = {x: obj2.cx - obj1.cx, y: obj2.cy - obj1.cy};
            console.log(vCollision.y)
            let distance = Math.sqrt((obj2.cx-obj1.cx)**2 + (obj2.cy-obj1.cy)**2);
            console.log(distance)
            let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
            console.log(vCollisionNorm.y)
            let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
            let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
            console.log(vCollision.x)
            console.log(speed)
            obj1.vx = -(speed * vCollisionNorm.x)
            console.log(obj1.vy)
            obj1.vy = -(speed * vCollisionNorm.y)
            console.log(obj1.vy)
        }

        for (let j = i + 1; j < gameObjects.length; j++)
        {
            obj2 = gameObjects[j];

            // Compare object1 with object2
            if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
                console.log("ghjkl")
                let vCollision = {x: obj2.cx - obj1.cx, y: obj2.cy - obj1.cy};
                let distance = Math.sqrt((obj2.cx-obj1.cx)*(obj2.cx-obj1.cx) + (obj2.cy-obj1.cy)*(obj2.cy-obj1.cy));
                let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
                let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
                let impulse = 2 * speed / (obj1.mass + obj2.mass);
                obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
                obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
                obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
                obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
            }
        }
    }
}

function checkPaddle(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (x1 + w1 > x2 && x1 < x2 + w2) {
        obj1.vx = (obj1.vx + obj2.vx)
        obj1.vy = (obj1.vy + obj2.vy) * -1
    } else if (y1 + h1 >= y2 && x1 + w1 >= x2){

    }
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x1 + w1 >= x2 && x1 <= x2 + w2 && y1 + h1 >= y2 && y1 <= y2 + h2){
        return true;
    }
    return false;
}

function wallCollision(x, y, w, h) {
    if ( (x + w) >= canvas.width || x <= 0) {
        return 1
    } else if (y <= 0) {
        return 2
    }
    return 0
}