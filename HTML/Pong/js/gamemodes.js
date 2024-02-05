"use strict"


function base() {

}


function setBase() {
    document.getElementById("wave").classList.add("hidden")
    document.getElementById("waveNumber").innerText = wave
    document.getElementById("score").classList.add("hidden")
}


function stopBase() {
    document.getElementById("wave").classList.add("hidden")
}


function startBase() {
    document.getElementById("wave").classList.remove("hidden")
    document.getElementById("scoreWord").innerText = "Score"
    document.getElementById("score").classList.remove("hidden")
    newWave()
}


function exam() {

}


function setExam() {
    document.getElementById("score").classList.add("hidden")
    document.getElementById("square").classList.remove("hidden")
    document.getElementById("squareNumber").innerText = gameObjects.length
    document.getElementById("canvas").addEventListener("mousemove", mouseMove)
    spawnSquare()
}


function stopExam() {
    document.getElementById("square").classList.add("hidden")
    document.getElementById("canvas").removeEventListener("mousemove", mouseMove)
}


function startExam() {
    document.getElementById("scoreWord").innerText = "Compteur"
    document.getElementById("score").classList.remove("hidden")
}


function zen() {

}


function setZen() {
    active = true
    document.getElementById("squareNumber").innerText = gameObjects.length
    canvas.height = window.innerHeight * 0.9;
    canvas.style.bottom = "5%";
    document.getElementById("score").classList.add("hidden")
    document.getElementById("square").classList.remove("hidden")
}


function stopZen() {
    canvas.height = window.innerHeight * 0.95;
    canvas.style.bottom = "0";
    document.getElementById("square").classList.add("hidden")
}


function movePaddle(key) {
    console.log(game)
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
    if ((e.key == "ArrowLeft" || e.key == "ArrowRight") && game == "base") {
        movePaddle(false)
    }
})

function keyPress(e) {
    if ((e.key == "ArrowLeft" || e.key == "ArrowRight") && game == "base") {
        movePaddle(e.key)
    } else if (e.key == "d") {
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
        restartMode()
    } else if ((e.key == "=" || e.key == "+") && game != "base") {
        if (!gameOver) {
            createSquare()
        }
        
    } else if (e.key == "-" && game != "base") {
        if (!gameOver) {
            deleteSquare()
        }
    } else if (e.key == " ") {
        if(!active) {
            startMode()
        }
    } else if (e.key == "t") {
        //for tests [2]
    }
}

function restartMode() {
    setMode()
    startMode()
}


function startMode() {
    if (game == "base") {
        active = true
        startBase()
    } else if (game == "exam") {
        active = true
        startExam()
    }
}


function setMode() {
    active = false
    gameOver = false
    gameObjects = []
    warned = false
    points = 0
    wave = 0
    if (game == "base") {
        createPaddle()
        setBase()
    } else if (game == "exam") {
        createPaddle()
        setExam()
    } else if (game == "zen" || game == "home") {
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
    checkPoints()
}

function leavePoint(nb) {
    let square = gameObjects[nb]
    points -= (square.width - 20)
   checkPoints()
}

function changePoint() {
    console.log(points)
    points += 1
    console.log(points)
    if (points == 9) {
        document.getElementById("score").style.right = "2%"
        document.getElementById("score").style.left = "92%"
    }
    document.getElementById("scoreNumber").innerText = points
}


function spawnSquare() {
    if (game == "exam" && gameObjects.length > 10) {
        gameObjects.pop()
    } else if (gameObjects.length < 2 && game == "exam" && !active) {
        createSquare()
    }
    if (gameObjects.length >= 10) {
        document.getElementById("square").style.left = "1%"
        document.getElementById("square").style.right = "93%"
    } else if (gameObjects.length == 0 && (game == "exam" || game == "base")) {
        gameOver = true
        active = false
    }
    document.getElementById("squareNumber").innerText = gameObjects.length
}

function newWave() {
    wave++
    document.getElementById("waveNumber").innerText = wave
    for (let i = 0; i < Math.floor(Math.random() * 6) + 5; i++) {
        createSquare()
        console.log(i)
    }
    nextWave()
}

function nextWave() {
    next = 0
    for (let i = 0; i < gameObjects.length; i++) {
        next += gameObjects[i].width - 30
    }
    next += points
    console.log(next)
}

function checkPoints() {
    document.getElementById("scoreNumber").innerText = points
    if (points >= next) {
        console.log(next)
        console.log(points)
        newWave()
    }
}