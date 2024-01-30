"use strict"


function time(timeStamp) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    secondsPassed = Math.min(secondsPassed, 0.1)
}


function update() {
    if (game != "zen" && game != "home") {
        thePaddle.update(secondsPassed)
    }

    if (active) {
        for (let i = 0; i < gameObjects.length; i++) {
            let square = gameObjects[i]
            square.update(secondsPassed);
        }
    }
}


function redraw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.font = "300px pong";
    context.fillStyle = "#ffffff44";
    context.textAlign = "center";
    if (game == "base") {
        context.fillText("BASE", canvas.width/2, canvas.height/2+150);
    } else if (game == "exam") {
        context.fillText("EXAM", canvas.width/2, canvas.height/2+150);
    } else if (game == "zen") {
        context.fillText("ZEN", canvas.width/2, canvas.height/2+150);
    } else if (game == "home") {
        context.fillText("PONG", canvas.width/2, canvas.height/2+150);
    }

    instructions()

    context.strokeStyle = "white";
    context.setLineDash([5, 10]);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvas.width, 0);
    context.lineTo(canvas.width, canvas.height);
    if (game == "zen" || game == "home") {
        context.lineTo(0, canvas.height)  
    } else {
        context.moveTo(0, canvas.height)
    }
    context.lineTo(0, 0)
    context.stroke()

    if (game != "zen" && game != "home") {
        thePaddle.draw() 
    }

    deleteSquares()

    if (active) {
        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].draw();
        }
    }
}


function deleteSquares() {
    for (let i = 0; i < gameObjects.length; i++) {
        let square = gameObjects[i]
        if (square.x + square.width < 0 || square.x > canvas.width || square.y + square.height < 0 || square.y > canvas.height) {
            gameObjects.splice(i, 1)
        }
    }
}


function instructions() {
    context.font = "48px pong";
    context.fillStyle = "#ffffff44";
    context.textAlign = "center";
    context.fillText("🄱 = Base    🄴 = Exam    🅉 = Zen    🅁 = Recommencer", canvas.width/2, canvas.height/6);
    if (game == "zen" || game == "home") {
        context.fillText("[+] = Ajouter    [-] = Enlever", canvas.width/2, canvas.height/5 + 50);
    } else if (game == "exam") {
        context.font = "42px pong";
        context.fillText("[Espace] = Commencer    [+] = Ajouter    [-] = Enlever", canvas.width/2, canvas.height/5 + 50);
    } else if (game == "base") {
        context.fillText("[Espace] = Commencer", canvas.width/2, canvas.height/5 + 50);
    }
}