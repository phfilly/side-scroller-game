const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.5
const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

const keys = {
    d: {
        isPressed: false
    },
    a: {
        isPressed: false
    },
    w: {
        isPressed: false
    }
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 16,
                    y: y * 16
                }
            }))
        }
    })
})

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36) {
    platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            platformCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 16,
                    y: y * 16
                }
            }))
        }
    })
})

const player = new Player({
    position: { x: 100, y: 0 },
    collisionBlocks
})

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    url: './assets/img/background.png'
})

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // this is only called once
    c.save()
    c.scale(4, 4)
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update()

    collisionBlocks.forEach((block) => {
        block.update()
    })
    platformCollisionBlocks.forEach((block) => {
        block.update()
    })

    player.update()

    player.velocity.x = 0
    if (keys.d.isPressed) player.velocity.x = 2
    else if (keys.a.isPressed) player.velocity.x = -2

    c.restore()
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.isPressed = true
            break
        case 'd':
            keys.d.isPressed = true
            break
        case 'w':
            keys.w.isPressed = true
            player.velocity.y = -4
            break

    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.isPressed = false
            break
        case 'd':
            keys.d.isPressed = false
            break
    }
})