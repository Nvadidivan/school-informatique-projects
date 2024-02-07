"use strict"

let frame = 0;
let accel = 1325.95

class Allay {

    constructor(vy) {
        this.vy = vy
        this.h = canvas.height/7 * 3/5
        this.w = this.h * 82 / 69
        this.y = (canvas.height / 2) - (this.h / 2)
        this.x = canvas.width - 1500 
    }

    update() {
        if(accel < 0) {
            this.vy = accel
        } else {
            this.vy = accel * allayTime
        }
        
        console.log(accel)
        console.log(this.vy)
        this.y += this.vy * secondsPassed
    }

    draw() {
        let img = new Image;
        img.src = "./textures/allay/down/" + frame + ".png"
        context.fillStyle = "#ff0000"
        //context.fillRect(this.x, this.y, this.w, this.h)
        context.drawImage(img, 20, 5, 164, 138, this.x, this.y, this.w, this.h);
    }
}

function moveAllay(e) {
    console.log(canvas.height)
    if (e.key == " ") {
        allayTime = 0
        accel = -1325.95 * 0.2
        setTimeout(() => {
            allayTime = 0
            accel = 1325.95
        }, 100)
        if (!active && !gameOver) {
            window.requestAnimationFrame(gameLoop); 
            for (let i = 0; i < tubes.length; i++) {
                tubes[i].vx = -100
            }
            active = true
            }
    }
}