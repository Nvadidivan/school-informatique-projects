"use strict"


window.onload = init;


function gameLoop(timeStamp)
{
    time(timeStamp)

    if (game == "base") {
        base()
    } else if (game == "exam") {
        exam()
    } else if (game == "zen") {
        zen()
    }

    detectCollisions()

    update()

    redraw()

    window.requestAnimationFrame(gameLoop);
}