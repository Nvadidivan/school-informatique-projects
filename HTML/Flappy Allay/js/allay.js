"use strict"

let frame = 0;
let accel = 1325.95
let file = "down"

class Allay {

    constructor(vy) {
        this.vy = vy
        this.h = canvas.height/7 * 3/5
        this.w = this.h * 82 / 69
        this.y = (canvas.height / 2) - (this.h / 2)
        this.x = 100
    }

    update() {
        this.vy = accel * allayTime
        
        console.log(accel)
        console.log(this.vy)
        this.y += this.vy * secondsPassed
    }

    draw() {
        if (allay.vy <= 300 && allay.vy >= 0) {
            file = "flying"
        } else if (allay.vy  > 300) {
            file = "down"
        }
        let img = new Image;
        img.src = "./textures/allay/" + file + "/" + frame + ".png"
        context.fillStyle = "#ff0000"
        //context.fillRect(this.x, this.y, this.w, this.h)
        if (file != "dancing") {
            context.drawImage(img, 20, 5, 164, 138, this.x, this.y, this.w, this.h);
        } else {
            context.drawImage(img, 0, 0, 120, 90, this.x, this.y, this.w, this.h);
        }
    }
}

function moveAllay(e) {
    console.log(canvas.height)
    if (e.key == " ") {
        file  = "dancing"
        allayTime = -0.3
        accel = 1325.95
        if (!active && !gameOver) {
            window.requestAnimationFrame(gameLoop); 
            for (let i = 0; i < tubes.length; i++) {
                tubes[i].vx = -100
            }
            active = true
            }
    }
}