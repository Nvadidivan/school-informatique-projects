'use strict'


const allImages = [
    "meduse",
    "etoile",
    "corail",
    "dophin",
    "requin",
    "crabe",
    "hippocampe",
    "tortue",
    "pingouin",
    "phoque",
    "axolotl",
    "beluga",
    "plongeur",
    "bouteille",
    "pelican"
]

var images = []

var choix = ''
var ancienChoix = ''
var ancienNumImage = 0
var numImagesGelees = []
var compteur = 0
var tick = 0
var numPair = 0


const choisirImages = function () {
    brasserImages(allImages)
    for (let i = 0; i < lvl / 2; i++) {
        let theImage = allImages[i]
        let image1 = theImage + "-1.png"
        let image2 = theImage + "-2.png"
        images.push(image1, image2)
        console.log(images)
    }
    brasserImages(images)
}

const entierAleatoire = function (max) {
    var t1 = Math.random()

    var t2 = t1 * max

    var entier = Math.floor(t2)

    console.log(t1, "", t2, "", entier)

    return entier
}

const brasserImages = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        var indexAuHasard = entierAleatoire(i)
        const temp = array[i]
        array[i] = array[indexAuHasard]
        array[indexAuHasard] = temp
    }
}

const montrer = function (numImage) {
    console.log()
    if (numImagesGelees.includes(numImage)) {
        return
    }
    console.log(images)
    var nomFichier = images[numImage]
    console.log(images)
    console.log(nomFichier)

    choix = nomFichier.split('-')[0]

    var img = document.getElementById("img" + numImage)
    var lastImg = document.getElementById("img" + ancienNumImage)

    console.log(choix)
    console.log(numImage.toString())
    console.log(img)

    img.src = 'images/' + nomFichier

    if (numPair == 0) {
        console.log(numPair + "zero")
        numImagesGelees.push(numImage)
        ++numPair
    } else {
        compteur++
        document.getElementById("compteur").innerText = compteur + " essais";
        if (choix === ancienChoix) {
            numImagesGelees.push(numImage)
            pop(numImage, ancienNumImage)
            bubblesLeft.splice(bubblesLeft.indexOf(numImage), 1)
            bubblesLeft.splice(bubblesLeft.indexOf(ancienNumImage), 1)
        } else {
            numImagesGelees.pop()
            console.log(ancienNumImage)
            console.log(numImage)
            console.log(choix)
            console.log(ancienChoix)
            setTimeout(() => lastImg.src = "images/interrogation-3.png", 500)
            setTimeout(() => img.src = "images/interrogation-3.png", 500)
        }
        --numPair
    }
    console.log(numImagesGelees)
    console.log(numPair)
    ancienChoix = choix
    ancienNumImage = numImage

    if (numImagesGelees.length == lvl) {
        gameWon = true
    }
}

var gameWon = false;
var gameOver = false;

const afficherChrono = function () {
    tick--
    document.getElementById("chrono").innerText = (tick / 100).toFixed(2) + " secondes restantes";
}

const auDemarrage = function () {
    choisirImages()
    tick = maxTime
    var auDemarrageInterval = setInterval(() => {
        if (tick > 0 && gameWon == false) {
            afficherChrono()
        } else {
            gameOver = true;
            clearInterval(auDemarrageInterval)
            endGame()
        }
    }, 10)
}

var lvl = 6
var level = "sm"
var maxTime = 1200

const setSmall = function () {
    document.getElementById("medium").style.backgroundColor = "#2adab7"
    document.getElementById("large").style.backgroundColor = "#2adab7"
    document.getElementById("small").style.backgroundColor = "#00aaff"
    lvl = 6
    level = "sm"
    maxTime = 1200
}

const setMedium = function () {
    document.getElementById("small").style.backgroundColor = "#2adab7"
    document.getElementById("large").style.backgroundColor = "#2adab7"
    document.getElementById("medium").style.backgroundColor = "#00aaff"
    lvl = 24
    level = "md"
    maxTime = 6000
}

const setLarge = function () {
    document.getElementById("small").style.backgroundColor = "#2adab7"
    document.getElementById("medium").style.backgroundColor = "#2adab7"
    document.getElementById("large").style.backgroundColor = "#00aaff"
    lvl = 96
    level = "lg"
    maxTime = 30000
}

var bubblesLeft = []

const removeLeftBubbles = function () {
    for (let i = 0; i < bubblesLeft.length; i++) {
        pop(bubblesLeft[i], bubblesLeft[i])
    }
}

const setPage = function () {
    document.getElementById("home").classList.add("hidden")
    document.getElementById(level).classList.remove("hidden")
    document.getElementById("info").className = "info";
    document.getElementById("info").style.animation = "0.1s linear reverse down";
    setTimeout(() => auDemarrage(), 750)
    console.log(lvl)
    for (let i = 0; i < lvl; i++) {
        let div = document.createElement("div");
        document.getElementById(level).appendChild(div);
        div.id = "div" + i;
        div.setAttribute("onclick", "montrer(" + i + ")")
        let img = document.createElement("img");
        document.getElementById(div.id).appendChild(img);
        console.log(div)
        console.log(img)
        img.id = "img" + i
        img.src = "images/interrogation-3.png"
        console.log(i);
        bubblesLeft.push(i)
    }
}

const start = function () {
    document.getElementById("submarine-red").classList.add("leave")
    document.getElementById("wave").classList.remove("finalScore")
    document.getElementById("wave").classList.add("leave")
    setTimeout(() => {
        document.getElementById("main-container").classList.add("mainContainer")
        setTimeout(() => document.getElementById("main-container").remove(), 1750)
        setTimeout(() => setPage(), 250)
    }, 500)
}

const flyBubbles = function () {
    let mainContainer = document.createElement('div');
    mainContainer.id = "main-container"
    mainContainer.className = "main-container"
    document.body.appendChild(mainContainer)
    var value = 0
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 10; j++) {
            const bubbleContainer = document.createElement('div');
            document.getElementById(mainContainer.id).appendChild(bubbleContainer);
            bubbleContainer.className = "bubble-container " + "bubble-main";
            bubbleContainer.innerHTML = `<div class="bubbles">
            </div>`;
            bubbleContainer.style.left = `${12.5 * i + (entierAleatoire(125) / 10) - 7.5}%`;
            bubbleContainer.style.top = `${10 * j + entierAleatoire(10)}%`;
            var duration = (110 + entierAleatoire(50)) / 100
            bubbleContainer.style.animationDuration = duration.toString() + "s";
            console.log(bubbleContainer.style.animationDuration)
        }
    }
}

var highScore = 0

const endGame = function () {
    removeLeftBubbles()
    var score = Math.round((tick / maxTime) * 1000 - ((compteur / (lvl / 2)) * 50) + Math.floor(numImagesGelees.length / 2) * 10)
    if (score < 0) {
        score = 0
    }
    document.getElementById("score").innerText = score + " points"
    if (highScore <= score && gameWon == true) {
        document.getElementById("phrase").innerText = "Bravo! Vous avez battu votre record!"
    } else if (gameWon == true) {
        document.getElementById("phrase").innerText = "Bravo! Vous avez gagné!"
    } else {
        document.getElementById("phrase").innerText = "Bien essayé!"
    }
    if (highScore <= score) {
        highScore = score
        document.getElementById("highScore").innerText = "Record: " + highScore + " points"
    }
    console.log(score)
    document.getElementById("submarine-red").classList.add("hidden")
    document.getElementById("submarine-red").classList.remove("leave")
    setTimeout(() => {
        for (let i = 0; i < lvl; i++) {
            console.log("div" + i)
            document.getElementById("div" + i).remove()
        }
        document.getElementById(level).classList.add("hidden")
        document.getElementById("home").classList.remove("hidden")
        document.getElementById("submarine-green").classList.remove("hidden")
        document.getElementById("submarine-green").classList.add("finalScore")
        document.getElementById("wave").classList.add("finalScore")
    }, 500)
}

const restart = function () {
    document.getElementById("info").style.animation = "0.1s linear up";
    setTimeout(() => document.getElementById("info").className = "hidden", 100);
    numImagesGelees = []
    images = []
    choix = ''
    ancienChoix = ''
    ancienNumImage = 0
    compteur = 0
    tick = 0
    numPair = 0
    gameOver = false
    gameWon = false
    bubblesLeft = []
    document.getElementById("submarine-red").classList.remove("hidden")
    document.getElementById("submarine-green").classList.remove("finalScore")
    document.getElementById("submarine-green").classList.add("leaveScreenRight")
    document.getElementById("submarine-red").classList.add("joinScreen")
    document.getElementById("wave1").style.animationDuration = "2s"
    document.getElementById("wave2").style.animationDuration = "2s"
    flyBubbles()
    setTimeout(() => {
        document.getElementById("submarine-green").classList.add("hidden")
        document.getElementById("submarine-red").classList.remove("joinScreen")
        document.getElementById("submarine-green").classList.remove("leaveScreenRight")
        document.getElementById("wave1").style.animationDuration = ""
        document.getElementById("wave2").style.animationDuration = ""
    }, 1500)
}

const pop = function (numImage, ancienNumImage) {
    document.getElementById("div" + numImage).classList.add("pop")
    document.getElementById("div" + ancienNumImage).classList.add("pop")
}
