export default class Enemy {
    constructor({x, y, image, ctx}) {
        this.position = {
            x,
            y
        }

        this.velocity= {
            x: -10
        }
        this.ctx = ctx;
        this.frames = 0;
        this.image = image;
        this.width = 60;
        this.height = 44;
    }
    draw(){
        this.ctx.drawImage(
            this.image, 
            60 * this.frames,
            0,
            60,
            44,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height)
    }

    update(){
        
        if (this.frames > 6){
            this.frames = 0;
        }
        this.frames++;
        this.draw()
        this.position.x += this.velocity.x;
    }
}