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


function init(){
    // Get a reference to the canvas
    canvas = document.getElementById("canvas");
    canvas.style.cursor = "none";
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.9;
    setGrid()
    context = canvas.getContext("2d");
    context.font = "400px pong";
    context.fillStyle = "#ffffff44";
    context.textAlign = "center";
    context.fillText("Hello World!", canvas.width/2, canvas.height/3*2);
    game = "home"
    setZen()
    createWorld()
    window.requestAnimationFrame(gameLoop);
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


function createWorld(){
    if (game != "zen" && game != "home") {
        createPaddle()
    }
    for (let i = 0; i < 2; i++) {
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