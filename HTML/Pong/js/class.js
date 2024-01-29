"use strict"


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