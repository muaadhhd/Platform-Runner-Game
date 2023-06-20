export default class Platform {
    constructor({ x, y, image, ctx }){
        this.position = {
            x,
            y
        }
        this.ctx = ctx;
        this.image = image;
        this.width = image.width;
        this.height = 20;
    }
    draw(){
        this.ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}