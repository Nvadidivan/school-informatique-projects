"use strict"

function createSquare() {
    for (let i = 0; i < gameObjects.length; i++) {
        let square = gameObjects[i]
        occupied(square.x, square.y, square.width, square.height)
    }
    let options = filterOptions()
    if (options.length > 0) {
        shuffleGrid(options)
        let row = options.pop()
        shuffleGrid(row)
        let location = row.pop()
        let x = location[1] * 20
        let y = location[2] * 20
        let size = location[3]
    
        let long;
        if (size == 1) {
            long = 40
        } else if (size == 2) {
            long = Math.trunc((Math.random() * (60 - 40 + 1) + 40)/10) * 10;
        } else if (size == 3) {
            long = Math.trunc((Math.random() * (80 - 50 + 1) + 50)/10) * 10
        }

        let colliding = false
        let xDir;
        let yDir;
        if (Math.random() < 0.5) {
            xDir = -1
        } else {
            xDir = 1
        }
        if (Math.random() < 0.5) {
            yDir = -1
        } else {
            yDir = 1
        }
        let vx = (Math.random() + 0.5) * 200 * xDir
        let vy = (Math.random() + 0.5) * 200 * yDir
        if (checkOccupied(location[1], location[2], long)) {
            colliding = true
        }

        //ClearGrid
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
    
                grid[i][j][0] = false
                grid[i][j][3] = 3
            }
        }

        if (colliding == false) {
            gameObjects.push(new Square(context, x, y, vx, vy, long))
        } else {
            createSquare()
        }
    } else {
        console.log("empty")
        window.alert("empty");
        //ClearGrid
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
    
                grid[i][j][0] = false
                grid[i][j][3] = 3
            }
        }
    }
}


function occupied(x, y, w, h) {
    let xS = Math.floor(x / 20)
    let xE = Math.floor((x + w) / 20)
    let yS = Math.floor(y / 20)
    let yE = Math.floor((y + h) / 20)

    if (xS < 0) {
        xS = 0
    }
    if (yS < 0) {
        yS = 0
    } 
    if (xE >= grid.length) {
        xE = grid.length - 1
    } 
    if (yE >= grid[0].length) {
        yE = grid[0].length - 1
    }

    for (let i = xS; i <= xE; i++) {
        for (let j = yS; j <= yE; j++) {
            grid[i][j][0] = true
        }
    }
}


function filterOptions() {
    let filter = []

    for (let i = 0; i < grid.length; i++) {
        maxSize(i)
        let temp = grid[i].filter(empty)
        
        if (temp.length > 0) {
            filter.push(temp)
        }
    }
    return filter
}


function maxSize(i) {
    for (let j = 0; j < grid[0].length; j++) {
        let size = grid[i][j][3]
        if (grid[i][j][0] || i >= grid.length - 1 || j >= grid[0].length - 1) {
            size = 0
        } else {
            // Max size of the square is 3 (0-3) so we loop through 4 times.
            for (let k = 0; k < 4; k++) {
                let x = i + k
                let checkShouldRun = true

                // Check if the square is out of bounds.
                if (x > grid.length - 1) {
                    let smallX = k - 1
                    grid[i][j][3] = Math.min(size, smallX)
                    checkShouldRun = false
                    x = grid.length - 1
                }

                // Loop through 3 grid spaces (from 0 to 3).
                for (let m = 0; m < 4; m++) {
                    let y = j + m

                    // Check if the square is out of bounds (vertically).
                    if (y > grid[0].length - 1) {
                        let smallY = m - 1
                        size = Math.min(size, smallY)
                        checkShouldRun = false
                        y = grid[0].length - 1
                    }

                    // Check if the square is occupied.
                    if (checkShouldRun) {
                        if (grid[x][y][0]) {
                            let small = Math.max(k, m)
                            size = Math.min(size, small - 1)
                        }
                    } else {
                        grid[i][j][3] = size
                        return
                    }
                }
            }
        }
        grid[i][j][3] = size
    }
}


function empty(value) {
    if (value[1] < 0 || value[1] >= grid.length - 1 || value[2] < 0 || value[3] <= 0 || value[0] || value[1] + value[3] >= grid.length - 1) {
        return false
    }

    if (game == "exam" || game == "base") {
        if (value[2] > Math.ceil(grid[0].length / 2)) {
            return false
        }
    } else {
        if (value[2] >= grid[0].length - 1 || value[2] + value[3] >= grid[0].length - 1) {
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


function checkOccupied(x, y, l) {
    let s = Math.ceil(l/20 - 1)
    let xS = x
    let xE = x + s
    let yS = y
    let yE = y + s


    if (xS < 0 || yS < 0 || xE > grid.length - 1 || yE > grid[0].length - 1) {
        console.log("one")
        return true;
    }

    for (let i = xS; i <= xE; i++) {
        for (let j = yS; j <= yE; j++) {
            if (grid[i][j][0]) {
                console.log("two")
                return true;
            }
        }
    }
    return false;
}
