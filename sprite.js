class Sprite {
    constructor({ position, url }) {
        this.position = position
        this.image = new Image()
        this.image.onload = () => {
        }
        this.image.src = url
    }

    draw() {
        if (!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw()
    }
}