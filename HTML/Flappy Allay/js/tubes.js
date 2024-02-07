"use strict"

class Tube {
    constructor(h, y, t, vx) {
        this.h = h
        this.height = h * (canvas.height/7)
        this.w = canvas.height/7
        this.x = canvas.width
        this.y = y
        this.t = t
        console.log(this.t)
        this.vx = vx

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


        console.log(tubes.length)
        if (tubes.length == 6) {
            console.log(tubes[0].x)
            console.log(tubes[2].x)
        }
    }

    update() {
        this.x += this.vx * secondsPassed

    }

    draw() {
        for(let i = 0; i < this.h; i++){
            console.log("yes")
            let img = new Image;
            img.src = this.t[i]
            console.log(this.t[i])
            console.log(img)
            context.drawImage(img, this.x, this.y + (i * (canvas.height/7)), (canvas.height/7), (canvas.height/7));
        }
    }
}


let tubes = []

function createColumn(vx) {
    let topHeight = Math.trunc(Math.random() * 4) + 1
    console.log(topHeight)
    let bottomHeight = 6 - topHeight - 1

    let texture = chooseTexture()
    let topTexture = texture.slice(0, topHeight)
    let bottomTexture = texture.slice(topHeight)


    createTube(topTexture, topHeight, 0, vx)
    createTube(bottomTexture, bottomHeight, 1, vx)
}

function createTube(texture, h, pos, vx) {

    let height = h * (canvas.height / 7)

    if (pos == 1) {
        pos = canvas.height - height
    }

    console.log(texture)
    tubes.push(new Tube(h, pos, texture, vx))
}

let textures = [
    "./textures/tubes/BlockSprite_birch-planks.webp",
    "./textures/tubes/BlockSprite_black-wool.webp",
    "./textures/tubes/BlockSprite_block-of-diamond.webp",
    "./textures/tubes/BlockSprite_block-of-lapis-lazuli.webp",
    "./textures/tubes/BlockSprite_blue-wool.webp",
    "./textures/tubes/BlockSprite_cobblestone.webp",
    "./textures/tubes/BlockSprite_cobweb.webp",
    "./textures/tubes/BlockSprite_cyan-wool.webp",
    "./textures/tubes/BlockSprite_dark-oak-log.webp",
    "./textures/tubes/BlockSprite_dark-oak-planks.webp",
    "./textures/tubes/BlockSprite_dirt.webp",
    "./textures/tubes/BlockSprite_double-smooth-stone-slab.png",
    "./textures/tubes/BlockSprite_gray-wool.webp",
    "./textures/tubes/BlockSprite_green-wool.webp",
    "./textures/tubes/BlockSprite_hay-bale.webp",
    "./textures/tubes/BlockSprite_light-blue-wool.webp",
    "./textures/tubes/BlockSprite_light-gray-wool.webp",
    "./textures/tubes/BlockSprite_lime-wool.webp",
    "./textures/tubes/BlockSprite_melon.webp",
    "./textures/tubes/BlockSprite_oak-leaves.webp",
    "./textures/tubes/BlockSprite_oak-planks.webp",
    "./textures/tubes/BlockSprite_obsidian.webp",
    "./textures/tubes/BlockSprite_orange-wool.webp",
    "./textures/tubes/BlockSprite_polished-andesite.webp",
    "./textures/tubes/BlockSprite_pumpkin.webp",
    "./textures/tubes/BlockSprite_red-wool.webp",
    "./textures/tubes/BlockSprite_tnt.webp",
    "./textures/tubes/BlockSprite_white-wool.webp",
    "./textures/tubes/BlockSprite_yellow-wool.webp"
]

let custom = [
    "./textures/tubes/BlockSprite_bookshelf.png",
    "./textures/tubes/BlockSprite_carved-pumpkin.webp",
    "./textures/tubes/BlockSprite_coarse-dirt.webp",
    "./textures/tubes/BlockSprite_mossy-cobblestone.webp"
]

function chooseTexture() {

    //random value
    let random = Math.trunc(Math.random() * (textures.length - 1))

    let special = [textures[random]]

    let texture = []

    for (let i = 0; i < 6; i++) {

        special = [textures[random]]

        let maybe = Math.trunc(Math.random() * 5)
        if (maybe == 1) {
            if (special == textures[20]) {
                special = custom[0]
            } else if (special == textures[24]) {
                special = custom[1]
            } else if (special == textures[10]) {
                special = custom[2]
            } else if (special == textures[5]) {
                special = custom[3]
            }

        }

        texture.push(special)

    }

    console.log(texture)
    return texture
}