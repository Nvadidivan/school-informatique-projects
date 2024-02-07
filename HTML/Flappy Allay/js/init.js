"use strict"

let canvas;
let context;
let allay;
let active = false;
let gameOver = false;

function init() {
    canvas = document.getElementById("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    context = canvas.getContext("2d")
    context.imageSmoothingEnabled = false;
    createColumn(0)
    createColumn(0)
    createColumn(0)
    allay = new Allay(0)

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#ff00ff"
    context.fillRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < tubes.length; i++) {
        tubes[i].draw()
    }
    allay.draw()
    document.addEventListener("keydown", moveAllay)
}