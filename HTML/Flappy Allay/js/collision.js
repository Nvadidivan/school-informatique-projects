"use strict"

let deathMessage = ""

function deleteTubes() {
    for (let i = 0; i < tubes.length; i++) {
        if (tubes[i].x + (canvas.height/7) <= 0) {
            tubes.splice(i, 2)
        }
    }
}

function ground() {
    if (allay.y + allay.h >= canvas.height) {
        gameOver = true
        active = false
        deathMessage = "Allay hit the ground too hard"
    }
}

function roof() {
    if (allay.y <= 0) {
        gameOver = true
        active = false
        deathMessage = "Allay left the confines of this world"
    }
}

function tube() {
    for (let i = 0; i < 2; i++) {
        let tube = tubes[i]
        if (tube.x <= allay.x + allay.w && allay.x <= tube.x + tube.w && tube.y <= allay.y + allay.h && allay.y <= tube.y + tube.height) {
            gameOver = true
            active = false
            deathMessage = "Allay experienced kinetic energy"
            console.log(deathMessage)
        }
    }
}