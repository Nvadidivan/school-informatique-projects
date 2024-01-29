"use strict"

let all = {}
let grid = []

function checkOccupied(x, y, w, h) {
    let xS = Math.floor(x / 20)
    let xE = Math.floor((x + w) / 20)
    let yS = Math.floor(y / 20)
    let yE = Math.floor((y + h) / 20)

    if (xS <= 0 || yS <= 0 || xE >= grid.length - 1 || yE >= grid[0].length - 1) {
        console.log(xS)
        console.log(yS)
        console.log(xE)
        console.log(yE)
        console.log(grid.length - 1)
        console.log(grid[0].length - 1)
        console.log("yes")
        console.log(error)
        return true;
    }
    for (let i = xS; i <= xE; i++) {
        for (let j = yS; j <= yE; j++) {
            console.log(grid[i][j])
            if (grid[i][j][0]) {
                console.log(grid[i][j])
                console.log("very")
                console.log(error)
                return true;
            }
        }
    }
    return false;
}

function empty(value) {

    if (value[1] <= 0 || value[1] >= grid.length - 1 || value[2] <= 0 || value[3] <= 0) {
        return false
    }
    if (game != "zen" && game != "start") {
        if (value[2] >= Math.ceil(grid[0].length / 2)) {
            return false
        }
    } else {
        if (value[2] >= grid[0].length - 1) {
            return false
        }
    }

    return true
}

function shuffleGrid(array) {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function maxSize(i) {
    for (let j = 0; j < grid[0].length - 1; j++) {
        let size = grid[i][j][3]

        if (grid[i][j][0] == true) {
            size = 0
        } else {
            for (let k = 0; k < 4; k++) {
                let x = i + k
                if (x >= grid.length - 1) {
                    let smallX = k - 1
                    size = Math.min(size, smallX)
                } else {
                    for (let m = 0; m < 4; m++) {
                        let y = j + m
                        if (y >= grid[0].length - 1) {
                            let smallY = m - 1
                            size = Math.min(size, smallY)
                        } else {
                            if (grid[x][y][0] == true) {
                                let small = Math.max(k, m)
                                size = Math.min(size, small - 1)
                                
                            }
                        }
                    }
                }

            }
        }
        grid[i][j][3] = size
    }
}

function filterOptions() {
    let filter = []
    for (let i = 0; i < grid.length - 1; i++) {
        maxSize(i)
        let temp = grid[i].filter(empty)
        if (temp.length >= 1) {
            filter.push(temp)
        }
    }
    return filter
}

function clearGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {

            grid[i][j][0] = false
            grid[i][j][3] = 3
        }
    }
}

function occupied(x, y ,w, h) {
    let xS = Math.floor(x / 20)
    let xE = Math.floor((x + w) / 20)
    let yS = Math.floor(y / 20)
    let yE = Math.floor((y + h) / 20)

    if (xS < 0) {
        xS = 0
    } else if (yS < 0) {
        yS = 0
    } else if (xE >= grid.length) {
        xE = grid.length - 1
    } else if (yE >= grid[0].length) {
        yE = grid[0].length - 1
    }

    for (let i = xS; i < xE; i++) {
        for (let j = yS; j < yE; j++) {
            grid[i][j][0] = true
        }
    }
}

function setGrid() {
    let width = Math.floor(canvas.width / 20)
    let height = Math.floor(canvas.height / 20)
    for (let i = 0; i < width; i++) {
        grid.push([])
        for (let j = 0; j < height; j++) {
            grid[i].push([false, i, j, 3])
        }
    }
}

function time(timeStamp) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    secondsPassed = Math.min(secondsPassed, 0.1)
}

function update() {
    if (game != "zen" && game != "start") {
        thePaddle.update(secondsPassed)
    }

    clearGrid()

    for (let i = 0; i < gameObjects.length; i++) {
        let square = gameObjects[i]
        square.update(secondsPassed);
        occupied(square.x, square.y, square.width, square.height)
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
    } else if (game == "start") {
        context.fillText("PONG", canvas.width/2, canvas.height/2+150);
    }

    instructions()

    context.strokeStyle = "white";
    context.setLineDash([5, 10]);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvas.width, 0);
    context.lineTo(canvas.width, canvas.height);
    if (game == "zen" || game == "start") {
        context.lineTo(0, canvas.height)  
    } else {
        context.moveTo(0, canvas.height)
    }
    context.lineTo(0, 0)
    context.stroke()

    if (game != "zen" && game != "start") {
        thePaddle.draw() 
    }

    deleteSquare()

    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].draw();
    }
}

function deleteSquare() {
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
    if (game == "zen") {
        context.fillText("[+] = Ajouter    [-] = Enlever", canvas.width/2, canvas.height/5 + 50);
    }
}