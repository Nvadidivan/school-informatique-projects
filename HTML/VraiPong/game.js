var ball = {}
var ballLeft = 0
var ballBottom = 0
var ballRight = 0
var ballTop = 0
var leftWall = {}
var leftWallTop = 0
var leftWallBottom = 0
var rightWall = {}
var rightWallTop = 0
var rightWallBottom = 0
var height = window.innerHeight
var width = window.innerWidth
var leftWallX = 0
var rightWallX = 0
var check;
var x = 10
var y = -10
var yWall = 7
var lScore = 0
var rScore = 0

const checkInfo = function() {
    check = setInterval( () => {
        ball = document.getElementById('ball').getBoundingClientRect()
        console.log(ball)
        ballLeft = Math.round(ball.x)
        ballTop = Math.round(ball.y)
        ballRight = Math.round(width - ballLeft - ball.width)
        ballBottom = Math.round(height - ballTop - ball.height)
        leftWall = document.getElementById('lWall').getBoundingClientRect()
        leftWallTop = Math.round(leftWall.y)
        leftWallBottom = Math.round(height - leftWallTop - leftWall.height)
        rightWall = document.getElementById('rWall').getBoundingClientRect()
        rightWallTop = Math.round(rightWall.y)
        rightWallBottom = Math.round(height - rightWallTop - rightWall.height)
        console.log(checkBallCollision() + "dhdhd")
        if (checkBallCollision() > 0) {
            whenCollision(checkBallCollision())
            clearInterval(check)
            return;
        }
        if (ballLeft <= 0) {
            rScore++
            document.getElementById("rScore").innerText = rScore
            document.getElementById('ball').style.top = "50%"; 
            document.getElementById('ball').style.left = "50%"; 
            clearInterval(check)
            return;
        } else if (ballRight <= 0) {
            lScore++
            document.getElementById("lScore").innerText = lScore
            document.getElementById('ball').style.top = "50%"; 
            document.getElementById('ball').style.left = "50%"; 
            clearInterval(check)
            return;
        }
        moveBall()
    }, 40)
    leftWallX = Math.round(leftWall.left + leftWall.width)
    rightWallX = Math.round(width - rightWall.left)
}

checkInfo()


const moveBall = function() {
    ballLeft = ballLeft + x
    ballTop = ballTop + y
    console.log(ballBottom)
    console.log(ballTop)
    document.getElementById('ball').style.top = ballTop + "px"; 
    document.getElementById('ball').style.left = ballLeft + "px";  
}

const whenCollision = function(type) {
    console.log("h")
    if (type == 1) {
        y = (y + Math.round(Math.random() * 5)) * -1
        console.log(y)
    } else if (type == 2) {
        console.log(x)
        x = (x + Math.round(Math.random() * 5)) * -1
        console.log(x + "XX")
    }
    moveBall()
    moveBall()
    checkInfo()
}


const checkBallCollision = function() {
    if (ballTop <= Math.abs(y) || ballBottom <= Math.abs(y)) {
        console.log("y")
        return 1;
    } else if (((ballLeft <= leftWallX) && ((ballLeft+ball.width) >= leftWall.left)) || ((ballRight <= rightWallX) && ((ballRight+ball.width) >= (rightWallX-rightWall.width)))) {
        if (((ballTop+ball.height) >= leftWallTop) && ((ballBottom + ball.height) >= leftWallBottom)) {
            console.log(leftWallBottom)
            console.log("left")
            console.log(ballBottom)
            return 2;
        } else if ((ballTop+ball.height) >= rightWallTop && ballBottom >= rightWallBottom) {
            console.log("right")
            return 2;
        } else {
            console.log(ballTop)
            console.log(rightWallTop)
            console.log(ballBottom)
            console.log(rightWallBottom)
            console.log("half")
            return 0;
        }
    } else {
        console.log("no")
        return 0;
    }
}

const moveLeftWall = function(dir) {
    leftWallTop = leftWallTop + (yWall * dir)
    document.getElementById("lWall").style.top = leftWallTop + "px"; 
}

const moveRightWall = function(dir) {
    rightWallTop = rightWallTop + (yWall * dir)
    document.getElementById("rWall").style.top = rightWallTop + "px"; 
}

window.addEventListener("keydown", (key) => {
    if (key.key == "w") {
        moveLeftWall(-1)
    } else if (key.key == "s") {
        moveLeftWall(1)
    } else if (key.key == "ArrowUp") {
        moveRightWall(-1)
    } else if (key.key == "ArrowDown") {
        moveRightWall(1)
    }
});