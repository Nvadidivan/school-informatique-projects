"use strict"

let canvas;
let context;
let secondsPassed = 0;
let oldTimeStamp = 0;
let gameObjects = []
let grid = []
let thePaddle;
let game;
let points = 0
let active = false
let gameOver = false
let big;
let next = 0;
let wave = 0;
let code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a", "Enter"];
let current = 0
let warned = false


function init(){
    // Get a reference to the canvas
    game = "home"
    canvas = document.getElementById("canvas");
    canvas.style.cursor = "none";
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.9;
    context = canvas.getContext("2d");
    context.font = "400px pong";
    context.fillStyle = "#ffffff44";
    context.textAlign = "center";
    context.fillText("Hello World!", canvas.width/2, canvas.height/3*2);
    setZen()
    setGrid()
    console.log(grid)
    createWorld()
    big = new Square(context, Math.random()*10, Math.random()*10, Math.random()*100 + 50, Math.random()*100 + 50, canvas.width*0.5, "#000000")
    window.addEventListener('keydown', konamiCode);
    window.addEventListener("keydown", keyPress)
    window.requestAnimationFrame(gameLoop);
}



function setGrid() {
    let width = Math.floor(canvas.width / 20)
    console.log(width)
    let height = Math.floor(canvas.height / 20)
    for (let i = 0; i < width; i++) {
        console.log(i)
        grid.push([])
        console.log(grid)
        for (let j = 0; j < height; j++) {
            grid[i].push([false, i, j, 3])
        }
    }
}


function createWorld(){
    if (game != "zen" && game != "home") {
        createPaddle()
    }
    for (let i = 0; i < 4; i++) {
        createSquare()
    }
}


function createPaddle() {
    let x = 0
    let y = canvas.height
    thePaddle = (new Paddle(context, x, y, 0, 0))
    thePaddle.x = (canvas.width / 2) - thePaddle.width/2;
    thePaddle.y = canvas.height - thePaddle.height
}