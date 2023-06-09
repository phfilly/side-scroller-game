const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.1
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
    },
    attack1: {
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
                },
                height: 4
            }))
        }
    })
})

const player = new Player({
    position: { x: 100, y: 300 },
    collisionBlocks,
    platformCollisionBlocks,
    src: './assets/img/warrior/Idle.png',
    frameRate: 8,
    animations: {
        Idle: {
            src: './assets/img/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 8
        },
        Run: {
            src: './assets/img/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 5
        },
        RunLeft: {
            src: './assets/img/warrior/RunLeft.png',
            frameRate: 8,
            frameBuffer: 5
        },
        JumpLeft: {
            src: './assets/img/warrior/JumpLeft.png',
            frameRate: 2,
            frameBuffer: 3
        },
        Jump: {
            src: './assets/img/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 3
        },
        Fall: {
            src: './assets/img/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 3
        },
        FallLeft: {
            src: './assets/img/warrior/FallLeft.png',
            frameRate: 2,
            frameBuffer: 3
        },
        Attack1: {
            src: './assets/img/warrior/Attack1.png',
            frameRate: 4,
            frameBuffer: 4
        }
    }
})

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    src: './assets/img/background.png'
})

const backgroundImageHeight = 432

const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // this is only called once
    c.save()
    c.scale(4, 4)
    c.translate(camera.position.x, camera.position.y)
    background.update()

    player.checkForHorizontalCanvasCollision()
    player.update()

    player.velocity.x = 0
    if (keys.d.isPressed) {
        player.switchSprite('Run')
        player.velocity.x = 2
        player.shouldPanCameraToTheLeft({ canvas, camera })
    } else if (keys.a.isPressed) {
        player.switchSprite('RunLeft')
        player.velocity.x = -2
        player.shouldPanCameraToTheRight({ canvas, camera })
    } else if (keys.attack1.isPressed) {
        player.switchSprite('Attack1')
    } else if (player.velocity.y === 0) {
        player.switchSprite('Idle')
    }

    // jumping
    if (player.velocity.y < 0) {
        player.shouldPanCameraDown({ canvas, camera })
        player.switchSprite('Jump')
    }
    // else if (player.velocity.y < 0 && player.velocity.x < 0) player.switchSprite('JumpLeft')
    else if (player.velocity.y > 0) {
        player.switchSprite('Fall')
        player.shouldPanCameraUp({ canvas, camera })
    }
    // else if (player.velocity.x > 0) player.switchSprite('FallLeft')

    c.restore()
}

animate()

window.addEventListener('keydown', (event) => {
    detectMovementKey(event.key)
})

window.addEventListener('keyup', (event) => {
    resetMovement(event.key)
})

function resetMovement(key) {
    switch (key) {
        case 'left':
        case 'a':
            keys.a.isPressed = false
            break
        case 'right':
        case 'd':
            keys.d.isPressed = false
            break
        case ' ':
            keys.attack1.isPressed = false
            break
    }
}

function detectMovementKey(key) {
    switch (key) {
        case 'left':
        case 'a':
            keys.a.isPressed = true
            break
        case 'right':
        case 'd':
            keys.d.isPressed = true
            break
        case 'up':
        case 'w':
            keys.w.isPressed = true
            // jump value
            player.velocity.y = -4
            break
        case ' ':
            keys.attack1.isPressed = true
            break
    }
}

function toggleMovement($event) {
    detectMovementKey($event.target.className)
}

function toggleMovementComplete($event) {
    resetMovement($event.target.className)
}

// const gamepadButtons = document.querySelectorAll('.gamepad-btn')
// gamepadButtons.forEach((button) => {
//     button.addEventListener("click", toggleMovement)
//     // button.addEventListener("mouseup", toggleMovementComplete)
// })

