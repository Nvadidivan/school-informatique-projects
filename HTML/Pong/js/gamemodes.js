"use strict"


function base() {

}


function setBase() {
    
}


function stopBase() {
}


function exam() {

}


function setExam() {
    document.getElementById("canvas").addEventListener("mousemove", mouseMove)
}


function stopExam() {
    document.getElementById("canvas").removeEventListener("mousemove", mouseMove)
}


function zen() {

}


function setZen() {
    canvas.style.bottom = "5%";
}


function stopZen() {
    canvas.style.bottom = "0";
}


function movePaddle(key) {
    if (key == "ArrowLeft") {
        thePaddle.vx = -600; 
        thePaddle.vfx = -600;
    } else if (key == "ArrowRight") {
        thePaddle.vx = 600; 
        thePaddle.vfx = 600
    } else {
        thePaddle.vx = 0;
        thePaddle.vfx = 0;
    }
}


window.addEventListener('keyup', function (e) {
    if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
        movePaddle(false)
    }
})


window.addEventListener("keydown", function(e) {
    if ((e.key == "ArrowLeft" || e.key == "ArrowRight") && game == "base") {
        movePaddle(e.key)
    } else if (e.key == "b") {
        if (game != "base") {
            stopMode()
            game = "base"
            setMode()
        }
    } else if (e.key == "e") {
        if (game != "exam") {
            stopMode()
            game = "exam"
            setMode()
        }
    } else if (e.key == "z") {
        if (game != "zen") {
            stopMode()
            game = "zen"
            setMode()
        }
    } else if (e.key == "r") {
        setMode()
    } else if ((e.key == "=" || e.key == "+") && game != "base") {
        createSquare()
    } else if (e.key == "-" && game != "base") {
        let random = Math.floor(Math.random()*gameObjects.length)
        gameObjects.splice(random, 1)
    } else if (e.key == " ") {
        //for tests [1]
    } else if (e.key == "t") {
        //for tests [2]
    }
})


function setMode() {
    gameObjects = []
    if (game == "base") {
        createPaddle()
        setBase()
    } else if (game == "exam") {
        createPaddle()
        setExam()
    } else if (game == "zen") {
        setZen()
    }
}


function stopMode() {
    if (game == "base") {
        stopBase()
    } else if (game == "exam") {
        stopExam()
    } else if (game == "zen") {
        stopZen()
    }
}


function mouseMove(e) {
    thePaddle.x = e.offsetX - thePaddle.width/2
}


function paddlePoint(nb) {
    let square = gameObjects[nb]
    if (square.width > 30) {
        square.x += 5
        square.y += 5
        square.width -= 10
        square.height -= 10
        square.mass = square.width**2
        
        points += 10
    } else {
        gameObjects.splice(nb, 1)
        
        points += 30
    }
}