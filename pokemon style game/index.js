let canvas = document.querySelector('canvas')
let c = canvas.getContext("2d")

canvas.width = 1040
canvas.height = 579

const collisionsMap = []

for(let i = 0; i < collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, 70 + i)); 
}


class Boundary{
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []

const offset = {
    x: -1330,
    y: -950
}
collisionsMap.forEach((row, i) =>{
    row.forEach((symbol, j) =>{
        if (symbol === 1025)
        boundaries.push(new Boundary({position:{
            x:j * Boundary.width + offset.x,
            y:i * Boundary.height + offset.y
        }}))
    })
})

console.log(boundaries);

const playerImage = new Image()
playerImage.src = "./img/playerDown.png"
const image = new Image()
image.src ="./img/games.png"

class Sprite{
    constructor({position, image, frames = {max:1}}){
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () =>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }
    draw(){
        c.drawImage(
                    this.image,
                    0,
                    0,
                    this.image.width/this.frames.max,
                    this.image.height,
                    this.position.x,
                    this.position.y,
                    this.image.width/this.frames.max,
                    this.image.height,
                )
    }
}


const player = new Sprite({
    position:{
        x:canvas.width /2 - 192 / 4 /2,
        y: canvas.height /2 - 68 /2
    },
    image: playerImage,
    frames: {
        max:4
    }
})

const background = new Sprite({
    position:{
        x:offset.x,
        y:offset.y
    },
    image: image
})

let keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    },
} 

const moveables = [background, ...boundaries]
function rectagularCollision({rectagule1, rectagule2}){
    return (rectagule1.position.x + rectagule1.width >= rectagule2.position.x
        && rectagule1.position.x <= rectagule2.position.x + rectagule2.width
        && rectagule1.position.y <= rectagule2.position.y + rectagule2.height
        && rectagule1.position.y + rectagule1.height >= rectagule2.position.y )
}
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary =>{
        boundary.draw()
        
    
    })
    player.draw()
    if (keys.w.pressed){
        for(let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectagularCollision({
                    rectagule1: player,
                    rectagule2: {...boundary, position:{
                        x: boundary.position.x,
                        y: boundary.position.y
                    }}
                })
            ){
                console.log("colideing");
            }
        }

        moveables.forEach((moveable) => {
            moveable.position.y += 5
        })
    }
    else if (keys.s.pressed){
        moveables.forEach((moveable) => {
            moveable.position.y -= 5
        })
    }
    else if (keys.d.pressed){
        moveables.forEach((moveable) => {
            moveable.position.x -= 5
        })
    }
    else if (keys.a.pressed){
        moveables.forEach((moveable) => {
            moveable.position.x += 5
        })
    }
}

animate()
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "a":
            keys.a.pressed = true
            break;
        case "d":
            keys.d.pressed = true
            break;
        case "w":
            keys.w.pressed = true
            break;
        case "s":
            keys.s.pressed = true
            break;
    }
})

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "a":
            keys.a.pressed = false
            break;
        case "d":
            keys.d.pressed = false
            break;
        case "w":
            keys.w.pressed = false
            break;
        case "s":
            keys.s.pressed = false
            break;
    }
})