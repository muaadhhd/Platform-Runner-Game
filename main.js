//Imports
import Player from "./scripts/player.js";
import Platform from "./scripts/platform.js";
import Enemy  from "./scripts/enemy.js"
import GenericObject from "./scripts/genericObject.js"

//Constants
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
let enemies;
let jumpMax = 2;
let jump = 0;
let scrollOffSet = 0; 
let lives = 2;

var sound = {
    jump: new Howl({
        src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/972918/jump.wav',
        'https://assets.codepen.io/21542/howler-sfx-levelup.mp3'],
        volume: 0.1,
    }),
    background: new Howl({
        src: ['/Beats/subway_to_the_past.wav'],
        volume: 1.5,
        loop: true
    }),
    dead: new Howl({
        src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/972918/playerdiedsound.wav'],
        volume: 0.15,
    }),
}

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

const enemyFly = new Image();
enemyFly.src = "./img/enemy_fly.png"

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

//Collision detection
function collision(object){
    if (player.position.x + player.width >= object.position.x + 50 && 
        player.position.x <= object.position.x + object.width - 50 &&
        player.position.y + player.height >= object.position.y &&
        player.position.y <= object.position.y + object.height + 50) {
        return true;
    }
}

// START/RESPAWN
function restart() {
    player = new Player(spriteStandRight, spriteRunRight, spriteStandLeft, spriteRunLeft, ctx, canvas)
    platforms = [
        new Platform({x:platform.width*9 + 600, y:490, image: bigPlat, ctx: ctx}),
        new Platform({x:7500, y:490, image: bigPlat, ctx: ctx}),
        new Platform({x:0, y:690, image: platform, ctx: ctx}), 
        new Platform({x:platform.width, y:690, image: platform, ctx: ctx}), 
        new Platform({x:platform.width*2, y:690, image: platform, ctx: ctx}), 
        new Platform({x:platform.width*3 + 250, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*4 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:2400 + 500, y:500, image: smallPlat, ctx: ctx}),
        new Platform({x:2699 + 500, y:500, image: smallPlat, ctx: ctx}),
        new Platform({x:platform.width*8 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*9 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*10 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*11 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*12 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*13 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*14 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*15 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*16 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*17 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:6500, y:500, image: smallPlat, ctx: ctx}),
        new Platform({x:platform.width*18 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*19 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*20 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*21 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*22 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*23 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*24 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*25 + 500, y:690, image: platform, ctx: ctx}),
        new Platform({x:platform.width*26 + 500, y:690, image: platform, ctx: ctx}),

    ]
    genericObject = [
        new GenericObject({x: 0, y: 0, image: background, ctx: ctx }),
        new GenericObject({x: 0, y: platform.height + 102, image: hills, ctx: ctx}),
    ]
    portall = new GenericObject({x: 8000, y: 200, image: portal, ctx: ctx});
    enemies = [
        new Enemy({x: 1000, y: 600, image: enemyFly, ctx: ctx}),
        new Enemy({x: 900, y: 800, image: enemyFly, ctx: ctx}),
        new Enemy({x: 900, y: 100, image: enemyFly, ctx: ctx}), 
        new Enemy({x: 3000, y: 200, image: enemyFly, ctx: ctx}), 
        new Enemy({x: 9000, y: 300, image: enemyFly, ctx: ctx}), 
        new Enemy({x: 5000, y: 750, image: enemyFly, ctx: ctx}), 
        new Enemy({x: 10000, y: 600, image: enemyFly, ctx: ctx}), 
        new Enemy({x: 7000, y: 600, image: enemyFly, ctx: ctx}), 
        new Enemy({x: 11000, y: 600, image: enemyFly, ctx: ctx}), 
        new Enemy({x: 13000, y: 600, image: enemyFly, ctx: ctx}),
    ] 

    obstacles = [ 
        new GenericObject({x: 2100, y: 0, image: spike, ctx: ctx}),
        new GenericObject({x: 2100, y: 550, image: stick, ctx: ctx}),
        new GenericObject({x: 3500, y: 630, image: cactus, ctx: ctx}),
        new GenericObject({x: 4000, y: 570, image: spikeup, ctx: ctx}),
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

    obstacles.forEach(obstacle=>{
        obstacle.draw();
    })
    player.update();

    enemies.forEach(enemy=>{
        enemy.update();
        if (collision(enemy)){
            restart();
        }
    })

    if((keys.up.pressed) && jump > 0){
        sound.jump.play()
        jump-= 1;
        player.velocity.y -= 15.5;
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
            sound.dead.play()
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

sound.background.play();
restart()
animate()