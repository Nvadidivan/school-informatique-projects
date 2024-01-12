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



window.onload = init;

window.addEventListener('keydown', function (e) {
    key = e.key;
})
window.addEventListener('keyup', function (e) {
    key = false;
})


function init(){
    // Get a reference to the canvas
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.91   ;
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
        this.angle = Math.atan((this.height / 2) / (this.width / 2)) * 180 / Math.PI
        this.velocity = Math.sqrt((this.vx)**2 + (this.vy)**2);
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
    }

    draw(){
        // Draw a simple square
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        // Move with set velocity
        this.x += this.vx * secondsPassed

        this.cx = (this.width / 2) + this.x
    }
}

function createWorld(){
    let x = (canvas.width / 2) - 100;
    let y = canvas.height - 40
    paddle.push(new Paddle(context, x, y, 0, 0))
    for (let i = 0; i < Math.random() * 10; i++) {
        createSquare()
    }
}

function createSquare() {
    let x = Math.random() * (canvas.width - 320) + 160
    let y = Math.random() * canvas.height / 2 + 80
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
    console.log(yDir)
    let length = (Math.random() * 40) + 40
    if (x <= 80 || y <= 0 || length <= 0) {
        createSquare()
    } else {
        let colliding = false
        for (let i = 0; i < gameObjects.length; i++) {
            let obj2 = gameObjects[i]
            if (rectIntersect(x - 20, y - 20, length + 40, length + 40, obj2.x, obj2.y, obj2.width, obj2.height)) {
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
    movePaddle()
    summonBall()

    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Move forward in time with a maximum amount
    secondsPassed = Math.min(secondsPassed, 0.1)

    paddle[0].update(secondsPassed)

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

        if (wallCollision(obj1.x, obj1.y, obj1.width) == 1) {
            obj1.vx *= -1
        } else if (wallCollision(obj1.x, obj1.y, obj1.width) == 2) {
            obj1.vy *= -1
        }

        obj2 = paddle[0];

        if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)) {
            let giveBonus = -1
            let boost = 1
            if (Math.random() <= 0.2) {
                giveBonus = -1.5
                boost = -1
                console.log("ye")
            }
            let vCollision = {x: obj2.cx - obj1.cx, y: obj2.cy - obj1.cy};
            let angle = Math.atan(Math.abs(vCollision.y / vCollision.x)) * 180 / Math.PI
            let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
            let velocity = Math.sqrt((vRelativeVelocity.x)**2 + (vRelativeVelocity.y)**2);
            let relVel = {x: vRelativeVelocity.x / velocity, y: vRelativeVelocity.y / velocity}
            let speed = vRelativeVelocity.x * relVel.x + vRelativeVelocity.y * relVel.y;
            if (angle > obj2.angle) {
                obj1.vy *= giveBonus
                console.log("d")
            } else if (angle < obj2.angle) {
                obj1.vx -= (2 * speed * relVel.x)
                obj1.vy *= boost
                console.log("e")
            } else {
                obj1.vx *= giveBonus
                obj1.vy *= giveBonus
                console.log("f")
            } console.log(angle)
            console.log(obj2.angle)
            obj1.update(secondsPassed);
        }


        /*if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
            let vRelativeVelocity = {x: obj1.vx + obj2.vfx, y: obj1.vy};
            let vCollision = {x: obj2.cx - obj1.cx, y: obj2.cy - obj1.cy}
            let angle = Math.atan(vCollision.y / Math.abs(vCollision.x)) * 180 / Math.PI
            if (angle >= obj2.angle) {
                obj1.vx = vRelativeVelocity.x
                obj1.vy = -vRelativeVelocity.y
            } else {
                obj1.vx = -vRelativeVelocity.x
                obj1.vy = vRelativeVelocity.y
            }

        }*/

        for (let j = i + 1; j < gameObjects.length; j++)
        {
            obj2 = gameObjects[j];

            // Compare object1 with object2
            if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
                let giveBonus = 1
                if (Math.random() <= 0.1) {
                    giveBonus = 1.5
                    console.log("yee")
                }
                let vCollision = {x: obj2.cx - obj1.cx, y: obj2.cy - obj1.cy};
                let distance = Math.sqrt((obj2.cx-obj1.cx)**2 + (obj2.cy-obj1.cy)**2);
                let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
                let velocity = Math.sqrt((vRelativeVelocity.x)**2 + (vRelativeVelocity.y)**2);
                let relVel = {x: vRelativeVelocity.x / velocity, y: vRelativeVelocity.y / velocity}
                let average = {x: (relVel.x + vCollisionNorm.x) / 2, y: (relVel.y + vCollisionNorm.y) / 2}
                let speed = vRelativeVelocity.x * average.x + vRelativeVelocity.y * average.y;
                let angleTOPBOTTOM = Math.atan(vCollision.y / Math.abs(vCollision.x)) * 180 / Math.PI
                let angleLEFTRIGHT = Math.atan(Math.abs(vCollision.y) / vCollision.x) * 180 / Math.PI
                let direction = rectDirection(angleTOPBOTTOM, angleLEFTRIGHT)
                console.log(direction)
                let impulse = 2 * speed / (obj1.mass + obj2.mass);
                obj1.vx -= (impulse * obj2.mass * average.x);
                obj1.vy -= (impulse * obj2.mass * average.y);
                obj2.vx += (impulse * obj1.mass * average.x);
                obj2.vy += (impulse * obj1.mass * average.y);
                obj1.vx *= giveBonus
                obj1.vy *= giveBonus
                obj1.update(secondsPassed);
            }
        }
    }
}


function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x1 + w1 >= x2 && x1 <= x2 + w2 && y1 + h1 >= y2 && y1 <= y2 + h2){
        return true;
    }
    return false;
}

function rectDirection(x, y) {
    // Check x and y for overlap
    if (x > 45) {
        return "top"
    } else if (x < -45) {
        return "bottom"
    } else if (x < 45 && x > -45) {
        if (y < 0) {
            return "left"
        } else {
            return "right"
        }
    } else {
        return "corner"
    }
}

function wallCollision(x, y, w) {
    if ( (x + w) >= (canvas.width - 5) || x <= 5) {
        return 1
    } else if (y <= 5) {
        return 2
    }
    return 0
}

function movePaddle() {
    let thePaddle = paddle[0]
    thePaddle.vx = 0
    if (key && key == "ArrowLeft") {thePaddle.vx = -600;}
    if (key && key == "ArrowRight") {thePaddle.vx = 600;}
    if ((thePaddle.x + thePaddle.width) >= (canvas.width - 5) && thePaddle.vx == 600) {
        thePaddle.vx = 0
    } else if (thePaddle.x <= 5 && thePaddle.vx == -600) {
        thePaddle.vx = 0
    }
}

function summonBall() {
    if (key && key == "a") {createSquare(); console.log("meow")}
}