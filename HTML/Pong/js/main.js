"use strict"


window.onload = init;


function gameLoop(timeStamp)
{
    if (game != "original") {
        time(timeStamp)

        detectCollisions()

        update()

        redraw()
        
        window.requestAnimationFrame(gameLoop);
    }
}

function konamiCode(e)  {
    if (game == "home") {
        if (e.key == code[current]) {
            current++
            if (current == code.length) {
                console.log("html")
                initOriginal()
            }
        } else {
            current = 0
        }
        console.log(current)
    }
}