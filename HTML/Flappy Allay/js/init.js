"use strict"

let canvas;
let context;
let allay;
let active = false;
let gameOver = false;
let count = true;
let level;
let levelUp;
let minecraft;

function init() {
    canvas = document.getElementById("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    context = canvas.getContext("2d")
    context.imageSmoothingEnabled = false;
    console.log(500 - canvas.height/7)
    createColumn(0)
    createColumn(0)
    createColumn(0)
    allay = new Allay(0)

    minecraft = new Audio("./resources/sounds/minecraft.ogg")
    level = new Audio("./resources/sounds/level.ogg")
    levelUp = new Audio("./resources/sounds/levelUp.ogg")

    level.volume = 0.25
    levelUp.volume = 0.25

    document.addEventListener("keydown", moveAllay)

    window.requestAnimationFrame(gameLoop);
}