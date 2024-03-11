let vexTexture = new Image;
vexTexture.src = "./resources/powerups/vex.png"

let honeyTexture = new Image;
honeyTexture.src = "./resources/powerups/honey.png"

let totemTexture = new Image;
totemTexture.src = "./resources/powerups/totem.png"

let powerup;
let powerupPresent = false;

class VisualPowerup {

    constructor(type, x, y, vx) {
        this.img = "./resources/powerups/" + type + "webp"
        console.log(type)
        this.type = type
        console.log(x)
        this.x = x
        this.y = y
        this.vx = vx
        if (this.type == "vex") {
            this.time = 5
        }
        this.size = 25
    }

    update() {
        this.x += this.vx * secondsPassed
        if (this.type == "vex") {
            this.time -= secondsPassed
            if (this.time <= 0) {
                this.stop()
            }
        }

    }

    draw() {
        if (this.type == "vex") {
            context.fillStyle = "gray"
        } else if (this.type == "honey") {
            context.fillStyle = "yellow"
        } else if (this.type == "totem") {
            context.fillStyle = "red"
        }
        context.fillStyle = "red"
        console.log(this.x)
        context.fillRect(this.x, this.y, this.size, this.size)
    }

    use()  {
        powerupPresent = false
    }
}

class ActivePowerup {
    constructor(type) {
        
    }
}

function CreatePowerup(vx) {
    let total = 500 - canvas.height/7
    console.log(500 - canvas.height/7)
    let x = (Math.random() * (total - 50 - 50) + 50) + canvas.height/7
    let y = (Math.random() * (canvas.height/7 * 6 - canvas.height/7)) + canvas.height/7
    let typeNb = Math.trunc(Math.random() * 3)
    let type;
    if (typeNb == 0) {
        type = "vex"
    } else if (typeNb == 1) {
        type = "honey"
    } else if (typeNb == 3) {
        type = "totem"
    }
    powerup = new VisualPowerup(type, x, y, vx)
    powerupPresent = true
}