"use strict"

window.onload = init;

let secondsPassed = 0;
let oldTimeStamp = 0;
let spawnNew = 0;
let updateAllay = 0;
let allayDist = 0;
let allayTime = 5

function gameLoop(timeStamp)
{
    if (active) {
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
        secondsPassed = Math.min(secondsPassed, 0.1)

        spawnNew += secondsPassed
        updateAllay += secondsPassed
        allayTime += secondsPassed  

        if (spawnNew >= 5) {
            spawnNew = 0
            createColumn(-100)
        }

        if (updateAllay >= 0.05) {
            updateAllay = 0
            frame++
            if (frame > 43) {
                frame = 0
            }
        } else if (file == "dancing" && updateAllay >= 0.03) {
            updateAllay = 0
            frame++
            if (frame > 15) {
                frame = 0
            }
        }

        for (let i = 0; i < tubes.length; i++) {
            tubes[i].update()
        }
        allay.update()

        deleteTubes()

        ground()

        roof()

        tube()

        context.clearRect(0, 0, canvas.width, canvas.height);

        let img = new Image
        img.src = "https://i.pinimg.com/736x/bf/84/69/bf846900ea9e1ac1ce0524e0d5914f7e.jpg"
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXP97oRzb8R3bxJiL5qbN27L0cqksjtGwjvgIug1lQA&s"
        img.src = "https://st2.depositphotos.com/21244960/47435/v/450/depositphotos_474352248-stock-illustration-pixel-background-concept-games-background.jpg"

        context.drawImage(img, 0, 0, canvas.width, canvas.height)

        for (let i = 0; i < tubes.length; i++) {
            tubes[i].draw()
        }
        allay.draw()        
        window.requestAnimationFrame(gameLoop);
    }
}