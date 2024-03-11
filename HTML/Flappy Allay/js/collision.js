"use strict"

let deathMessage = ""
let score = 0


function deleteTubes() {
    for (let i = 0; i < tubes.length; i++) {
        if (tubes[i].x + (canvas.height/7) <= 0) {
            tubes.splice(i, 2)
            count = true
        }
    }
}

function ground() {
    if (allay.colY + allay.colH >= canvas.height) {
        deathMessage = "Allay hit the ground too hard"
        end()
    }
}

function roof() {
    if (allay.colY <= 0) {
        deathMessage = "Allay left the confines of this world"
        end()
    }
}

function tube() {
    for (let i = 0; i < 2; i++) {
        let tube = tubes[i]
        if (tube.x <= allay.colX + allay.colW && allay.colX <= tube.x + tube.w && tube.y <= allay.colY + allay.colH && allay.colY <= tube.y + tube.height) {
            deathMessage = "Allay experienced kinetic energy"
            end()
        } else if (tubes[i].x + tubes[i].w < allay.x && tubes[i].y == 0 && count) {
            score++
            count = false
            if (score % 5 == 0) {
                levelUp.play()
            } else {
                level.play()
            }
        }
    }
}

function getPowerup() {
    if (powerup.x <= allay.colX + allay.colW) {
        if (allay.colX <= powerup.x + powerup.size && powerup.y <= allay.colY + allay.colH && allay.colY <= powerup.y + powerup.size) {
            powerup.use()
        }
        powerup = null
    }
}

function end() {
    gameOver = true
    active = false
    console.log(deathMessage)
    console.log(score)
}