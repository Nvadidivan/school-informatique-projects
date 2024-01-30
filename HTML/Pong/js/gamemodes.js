"use strict"


function base() {

}


function setBase() {
    points = 0
    document.getElementById("squareNumber").innerText = points
}


function stopBase() {
    active = false
}


function startBase() {
    active = true
}


function exam() {

}


function setExam() {
    points = 0
    document.getElementById("squareNumber").innerText = points
    document.getElementById("square").classList.remove("hidden")
    document.getElementById("canvas").addEventListener("mousemove", mouseMove)
}


function stopExam() {
    active = false
    document.getElementById("square").classList.add("hidden")
    document.getElementById("canvas").removeEventListener("mousemove", mouseMove)
}


function startExam() {
    active = true
}


function zen() {

}


function setZen() {
    active = true
    canvas.height = window.innerHeight * 0.9;
    canvas.style.bottom = "5%";
    document.getElementById("square").classList.remove("hidden")
}


function stopZen() {
    active = false
    canvas.height = window.innerHeight * 0.95;
    canvas.style.bottom = "0";
    document.getElementById("square").classList.add("hidden")
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
        deleteSquare()
    } else if (e.key == " ") {
        startMode()
    } else if (e.key == "t") {
        //for tests [2]
    }
})


function startMode() {
    if (game == "base") {
        startBase()
    } else if (game == "exam") {
        startExam()
    }
}


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
    } else if (game == "zen" || game == "home") {
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

function changePoint(type) {
    console.log(points)
    points += type
    console.log(points)
    console.log(type)
    if (points == 9 && type == 1) {
        document.getElementById("score").style.right = "2%"
        document.getElementById("score").style.left = "92%"
    }
    document.getElementById("scoreNumber").innerText = points
}

function spawnSquare() {
    if (gameObjects.length >= 10) {
        document.getElementById("square").style.left = "1%"
        document.getElementById("square").style.right = "93%"
    }
    document.getElementById("squareNumber").innerText = gameObjects.length
}