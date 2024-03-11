"use strict"

let tubeNb = 1

class Tube {
    constructor(h, y, t, vx) {
        this.h = h
        this.height = h * (canvas.height/7)
        this.w = canvas.height/7
        this.x = canvas.width
        this.y = y
        this.t = t
        this.vx = vx
        this.nb = tubeNb

        if ( this.y == 0) {
            tubeNb++
        }

        if (!active) {
            if (tubes.length == 2) {
                tubes[0].x = canvas.width - 1000
                tubes[1].x = canvas.width - 1000
            } else if (tubes.length == 4) {
                tubes[2].x = canvas.width - 500
                tubes[3].x = canvas.width - 500
            } else {
                this.x = canvas.width
            }
        }
    }

    update() {
        this.x += this.vx * secondsPassed

    }

    draw() {
        for(let i = 0; i < this.h; i++){
            let img = new Image;
            img.src = this.t[i]
            context.drawImage(img, this.x, this.y + (i * (canvas.height/7)), (canvas.height/7), (canvas.height/7));
        }
        if (this.y == 0) {
            context.font = "24px arial"
            context.fillStyle = "#ffffff";
            context.strokeStyle = "#000000";
            context.textAlign = "center";
            context.strokeText(this.nb, this.x + this.w/2, this.y + canvas.height/30)
            context.fillText(this.nb, this.x + this.w/2, this.y + canvas.height/30)
        }
    }
}


let tubes = []

function createColumn(vx) {
    let topHeight = Math.trunc(Math.random() * 4) + 1
    let bottomHeight = 6 - topHeight - 1

    let texture = chooseTexture()
    let topTexture = texture.slice(0, topHeight)
    let bottomTexture = texture.slice(topHeight)


    if (!powerupPresent) {
        let random = Math.trunc(Math.random() * 10)
        if (random == 0) {
            console.log(2)
            console.log(vx)
            createPowerup(vx)
        }
    }
    createTube(topTexture, topHeight, 0, vx)
    createTube(bottomTexture, bottomHeight, 1, vx)
}

function createTube(texture, h, pos, vx) {

    let height = h * (canvas.height / 7)

    if (pos == 1) {
        pos = canvas.height - height
    }

    tubes.push(new Tube(h, pos, texture, vx))
}

let resources = [
    "./resources/tubes/BlockSprite_birch-planks.webp",
    "./resources/tubes/BlockSprite_black-wool.webp",
    "./resources/tubes/BlockSprite_block-of-diamond.webp",
    "./resources/tubes/BlockSprite_block-of-lapis-lazuli.webp",
    "./resources/tubes/BlockSprite_blue-wool.webp",
    "./resources/tubes/BlockSprite_cobblestone.webp",
    "./resources/tubes/BlockSprite_cobweb.webp",
    "./resources/tubes/BlockSprite_cyan-wool.webp",
    "./resources/tubes/BlockSprite_dark-oak-log.webp",
    "./resources/tubes/BlockSprite_dark-oak-planks.webp",
    "./resources/tubes/BlockSprite_dirt.webp",
    "./resources/tubes/BlockSprite_double-smooth-stone-slab.png",
    "./resources/tubes/BlockSprite_gray-wool.webp",
    "./resources/tubes/BlockSprite_green-wool.webp",
    "./resources/tubes/BlockSprite_hay-bale.webp",
    "./resources/tubes/BlockSprite_light-blue-wool.webp",
    "./resources/tubes/BlockSprite_light-gray-wool.webp",
    "./resources/tubes/BlockSprite_lime-wool.webp",
    "./resources/tubes/BlockSprite_melon.webp",
    "./resources/tubes/BlockSprite_oak-leaves.webp",
    "./resources/tubes/BlockSprite_oak-planks.webp",
    "./resources/tubes/BlockSprite_obsidian.webp",
    "./resources/tubes/BlockSprite_orange-wool.webp",
    "./resources/tubes/BlockSprite_polished-andesite.webp",
    "./resources/tubes/BlockSprite_pumpkin.webp",
    "./resources/tubes/BlockSprite_red-wool.webp",
    "./resources/tubes/BlockSprite_tnt.webp",
    "./resources/tubes/BlockSprite_white-wool.webp",
    "./resources/tubes/BlockSprite_yellow-wool.webp"
]

let custom = [
    "./resources/tubes/BlockSprite_bookshelf.png",
    "./resources/tubes/BlockSprite_carved-pumpkin.webp",
    "./resources/tubes/BlockSprite_coarse-dirt.webp",
    "./resources/tubes/BlockSprite_mossy-cobblestone.webp"
]

function chooseTexture() {

    //random value
    let random = Math.trunc(Math.random() * (resources.length - 1))

    let special = [resources[random]]

    let texture = []

    for (let i = 0; i < 6; i++) {

        special = [resources[random]]

        let maybe = Math.trunc(Math.random() * 5)
        if (maybe == 1) {
            if (special == resources[20]) {
                special = custom[0]
            } else if (special == resources[24]) {
                special = custom[1]
            } else if (special == resources[10]) {
                special = custom[2]
            } else if (special == resources[5]) {
                special = custom[3]
            }

        }

        texture.push(special)

    }

    return texture
}