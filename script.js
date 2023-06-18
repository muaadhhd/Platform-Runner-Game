// Constants
const gravity = 1.5;

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }, 
    up: {
        pressed: false
    }
}

//variables
let portall;
let obstacles;
let platforms = [];
let genericObject = [];
let lastKey;
let player;
let projectile;
let jumpMax = 2;
let jump = 0;
let scrollOffSet = 0; 
let lives = 2;


//Images
const platform = new Image();
platform.src = "./img/platform2.png"

const background = new Image();
background.src = "./img/background.png"

const hills = new Image();
hills.src = "./img/hills.png"

const smallPlat = new Image();
smallPlat.src = "./img/smallPlat.png"

const bigPlat = new Image();
bigPlat.src = "./img/bigPlat.png"

const portal = new Image();
portal.src = "./img/portal.png"

const spike = new Image();
spike.src = "./img/spikes.png"
const spikeup = new Image();
spikeup.src = "./img/spikesup.png"

const stick = new Image();
stick.src = "./img/stick.png"

const cactus = new Image();
cactus.src = "./img/cactus.png"


//spriteSheets
const spriteStandRight = new Image();
spriteStandRight.src = "./img/spriteStandRight.png"

const spriteStandLeft = new Image();
spriteStandLeft.src = "./img/spriteStandLeft.png"

const spriteRunRight = new Image();
spriteRunRight.src = "./img/spriteRunRight.png"

const spriteRunLeft = new Image();
spriteRunLeft.src = "./img/spriteRunLeft.png"

//Canvas Setup
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth;
canvas.height = innerHeight;

//Events
addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 37:
            lastKey = "LEFT"
            player.velocity.x -= 20
            keys.left.pressed = true;
            break
        case 38:
            console.log("UP")
            // player.velocity.y -= 10
            keys.up.pressed = true;
            break
        case 39:
            lastKey = "RIGHT"
            player.velocity.x += 10
            keys.right.pressed = true;
            break
    }
})

addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 37:
            console.log("LEFT")
            keys.left.pressed = false;
            break
        case 38:
            console.log("UP")
            keys.up.pressed = false;
            break
        case 39:
            console.log("RIGHT")
            keys.right.pressed = false;
            break
    }
})

//Player
class Player {
    constructor(standRightImage, runRightImage, standLeftImage, runLeftImage){
        this.speed = 10;
        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 0
        }

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
        ctx.drawImage(
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

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity; 
        }
    }
}

class Object {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.velocity = {
            x: 20,
            y: 0
        }

        this.image = image;
        this.width = image.width;
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x;
    }
}

//Platform
class Platform {
    constructor({ x, y, image }){
        this.position = {
            x,
            y
        }

        this.image = image;
        this.width = image.width;
        this.height = 20;
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
    constructor({ x, y, image }){
        this.position = {
            x,
            y
        }

        this.image = image;
        this.width = image.width;
        this.height = 20;
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

//Collision detection
function collision(object){
    if (player.position.x + player.width >= object.position.x+ 50 && 
        player.position.x <= object.position.x + object.width - 50 &&
        player.position.y + player.height >= object.position.y &&
        player.position.y <= object.position.y + object.height + 50) {
        return true;
    }
}

// START/RESPAWN
function restart() {
    player = new Player(spriteStandRight, spriteRunRight, spriteStandLeft, spriteRunLeft)
    platforms = [
        new Platform({x:platform.width*9 + 600, y:490, image: bigPlat}),
        new Platform({x:0, y:690, image: platform}), 
        new Platform({x:platform.width, y:690, image: platform}), 
        new Platform({x:platform.width*2, y:690, image: platform}), 
        new Platform({x:platform.width*3 + 250, y:690, image: platform}),
        new Platform({x:platform.width*4 + 500, y:690, image: platform}),
        new Platform({x:2400 + 500, y:500, image: smallPlat}),
        new Platform({x:2699 + 500, y:500, image: smallPlat}),
        new Platform({x:platform.width*8 + 500, y:690, image: platform}),
        new Platform({x:platform.width*9 + 500, y:690, image: platform}),
        new Platform({x:platform.width*10 + 500, y:690, image: platform}),
        new Platform({x:platform.width*11 + 500, y:690, image: platform}),
        new Platform({x:platform.width*12 + 500, y:690, image: platform}),
        new Platform({x:platform.width*13 + 500, y:690, image: platform}),
        new Platform({x:platform.width*14 + 500, y:690, image: platform}),
        new Platform({x:platform.width*15 + 500, y:690, image: platform}),
        new Platform({x:platform.width*16 + 500, y:690, image: platform}),
        new Platform({x:platform.width*17 + 500, y:690, image: platform}),
        new Platform({x:platform.width*18 + 500, y:690, image: platform}),
        new Platform({x:platform.width*19 + 500, y:690, image: platform}),
        new Platform({x:platform.width*20 + 500, y:690, image: platform}),
        new Platform({x:platform.width*21 + 500, y:690, image: platform}),
        new Platform({x:platform.width*22 + 500, y:690, image: platform}),
        new Platform({x:platform.width*23 + 500, y:690, image: platform}),
        new Platform({x:platform.width*24 + 500, y:690, image: platform}),
        new Platform({x:platform.width*25 + 500, y:690, image: platform}),
        new Platform({x:platform.width*26 + 500, y:690, image: platform}),

    ]
    genericObject = [
        new GenericObject({x: 0, y: 0, image: background }),
        new GenericObject({x: 0, y: platform.height+102, image: hills }),
    ]
    portall = new GenericObject({x: 8000, y: 200, image: portal});
    // projectile = new Object({x: 800, y: 200, image: portal});


    obstacles = [ 
        new GenericObject({x: 2100, y: 0, image: spike}),
        new GenericObject({x: 2100, y: 550, image: stick}),
        new GenericObject({x: 3500, y: 630, image: cactus}),
        new GenericObject({x: 4000, y: 570, image: spikeup}),

    ]

    scrollOffSet = 0; 
}

//main
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)
    genericObject.forEach(genericObject=>{
        genericObject.draw();
    })

    platforms.forEach(platform=>{
        platform.draw();
    })
    portall.draw()
    // projectile.draw()

    obstacles.forEach(obstacle=>{
        obstacle.draw();
    })
    player.update();

    // if (player.position.x === 100){
    //     projectile.position.x -= 10;
    // }


    if((keys.up.pressed) && jump > 0){
        jump-= 1;
        player.velocity.y -= 15;
    }

    if(keys.right.pressed && player.position.x < 600){
        player.velocity.x = player.speed;
    }
    else if
    ((keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffSet === 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed;
    }else if((keys.up.pressed || !keys.up.pressed) && player.position.y <= 20 ){   
        player.velocity.y = 10;
    }
    else{
        player.velocity.x = 0;

        if (keys.right.pressed){
            scrollOffSet += player.speed;
            platforms.forEach(platform=>{
                platform.position.x -= player.speed;
            })
            genericObject.forEach(genericObject=>{
                genericObject.position.x -= player.speed * .66
            })
            obstacles.forEach(obstacle=>{
                obstacle.position.x -= player.speed * .66
            })
            portall.position.x -= player.speed * .66


        }else if (keys.left.pressed && scrollOffSet > 0){
            scrollOffSet -= player.speed;
            platforms.forEach(platform=>{
                platform.position.x += player.speed;  
            })
            genericObject.forEach(genericObject=>{
                genericObject.position.x += player.speed * .66
            })
            obstacles.forEach(obstacle=>{
                obstacle.position.x += player.speed * .66
            })
            portall.position.x += player.speed * .66
        }
    }

    //Platform Collision Detection
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && 
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
                jump = jumpMax;
                player.velocity.y = 0;
        }
    })

    //Sprite Switching
    if (keys.right.pressed && lastKey === "RIGHT" && player.currentSprite !== player.sprites.run.right) {
        player.frames = 0;
        player.currentSprite = player.sprites.run.right;
        player.currentCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
    }else if (keys.left.pressed && lastKey === "LEFT" && player.currentSprite !== player.sprites.run.left){
        player.currentSprite = player.sprites.run.left;
        player.currentCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
    }else if (!keys.left.pressed && lastKey === "LEFT" && player.currentSprite !== player.sprites.stand.left){
        player.currentSprite = player.sprites.stand.left;
        player.currentCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
    }else if (!keys.right.pressed && lastKey === "RIGHT" && player.currentSprite !== player.sprites.stand.right){
        player.currentSprite = player.sprites.stand.right;
        player.currentCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
    }

    //Win condition
    if (collision(portall)) {
        restart();
    }

    obstacles.forEach(obstacle=>{
        //Lose condition
        if (player.position.y > canvas.height || collision(obstacle)) {
            if (lives !== 0){
                lives-- ;
                restart();
            }
            else{
                console.log("You lose!");
                restart();
            }
        }
    })
}

restart()
animate()