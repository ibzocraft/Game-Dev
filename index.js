const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2

class Sprite{
    constructor({ position, velocity }){
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
    }

    draw(){
        context.fillStyle = "red"
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.velocity.y + this.height >= canvas.height ) {
            //at floor
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
}

const Player = new Sprite({
    position:{
        x: 0,
        y: 0
    },

    velocity:{
        x: 0,
        y: 0
    }
})

Player.draw()

const Enemy = new Sprite({
    position:{
        x: 600,
        y: 100
    },

    velocity:{
        x: 0,
        y: 0
    }
})

Enemy.draw()

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

let lastKey

function animate(){
    window.requestAnimationFrame(animate);

    context.fillStyle = "black"
    context.fillRect(0,0, canvas.width, canvas.height)
    Player.update()
    Enemy.update()

    Player.velocity.x = 0
    if (keys.a.pressed && lastKey === 'a') {
        Player.velocity.x = -2
    } else if (keys.d.pressed && lastKey === 'd') {
        Player.velocity.x = 2
    }

    console.log("frame")
}

animate()

window.addEventListener("keydown", (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
        break

        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
        break

        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
        break
    }
    
}) 

window.addEventListener("keyup", (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = false
        break

        case 'a':
            keys.a.pressed = false
        break

        case 'w':
            keys.w.pressed = false
        break
    }
    
}) 