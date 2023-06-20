export default class Player {
    constructor(standRightImage, runRightImage, standLeftImage, runLeftImage, ctx, canvas){
        this.speed = 10;
        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1.5;
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 66;
        this.height = 150;
        this.frames = 0;
        this.sprites = {
            stand: {
                right: standRightImage,
                left: standLeftImage,
                cropWidth: 177,
                width: 66
            },
            run: {
                right: runRightImage,
                left: runLeftImage,
                cropWidth: 341,
                width: 127.875
            }
        }
        this.currentSprite = this.sprites.stand.right;
        this.currentCropWidth = this.sprites.stand.cropWidth;
    }
    draw(){
        this.ctx.drawImage(
            this.currentSprite, 
            this.currentCropWidth * this.frames, 
            0, 
            this.currentCropWidth, 
            400, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
            )
    }

    update() {
        this.frames++

        if (this.frames > 59 && (this.currentSprite === this.sprites.stand.right ||
            this.currentSprite === this.sprites.stand.left)){
            this.frames = 0;
        }else if (this.frames > 29 && (this.currentSprite === this.sprites.run.right ||
            this.currentSprite === this.sprites.run.left)) {
            this.frames = 0;
        }
        this.draw()
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
            this.velocity.y += this.gravity; 
        }
    }
}