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
        if (file == "dancing") {
            this.colX = this.x + (36/120)*this.w
            this.colY = this.y + (10/105)*this.h
            this.colW = (64/120)*this.w
            this.colH = (80/105)*this.h
        } else if (file == "flying") {
            this.colX = this.x + (70/240)*this.w
            this.colY = this.y + (30/153)*this.h
            this.colW = (105/240)*this.w
            this.colH = (110/153)*this.h
        } else if (file == "down") {
            this.colX = this.x + (78/240)*this.w
            this.colY = this.y + (35/153)*this.h
            this.colW = (105/240)*this.w
            this.colH = (110/153)*this.h
        }
    }

    update() {
        this.vy = accel * allayTime
        
        this.y += this.vy * secondsPassed
        
        if (file == "dancing") {
            this.colX = this.x + (36/120)*this.w
            this.colY = this.y + (10/105)*this.h
        } else if (file == "flying") {
            this.colX = this.x + (70/240)*this.w
            this.colY = this.y + (30/153)*this.h
        } else if (file == "down") {
            this.colX = this.x + (78/240)*this.w
            this.colY = this.y + (35/153)*this.h
        }

        

       
    }

    draw() {
        if (allay.vy <= 300 && allay.vy >= 0) {
            file = "flying"
        } else if (allay.vy  > 300) {
            file = "down"
        }
        let img = new Image;
        img.src = "./resources/allay/" + file + "/" + frame + ".png"
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
    if (e.key == " ") {
        file  = "dancing"
        allayTime = -0.4
        accel = 1325.95
        if (!active && !gameOver) {
            minecraft.play()
            window.requestAnimationFrame(gameLoop); 
            for (let i = 0; i < tubes.length; i++) {
                tubes[i].vx = -100
            }
            if (powerupPresent) {
                powerup.vx = -100
            }
            active = true
            }
    }
}