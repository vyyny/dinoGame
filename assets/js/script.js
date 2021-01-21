const dino = document.querySelector(".dino");
const backGround = document.querySelector('.back_ground');
const score = document.querySelector('.score');
let isJumping = false;
let position = 0;
let gameOver = false;
let speed = 50;


let scoreInterval = setInterval(() => {
    if(gameOver){
       clearInterval(scoreInterval); 
    }else{
        scoreValue = parseInt(score.innerHTML);
        score.innerHTML = scoreValue + 1;
    }
}, 30);

let speedInterval = setInterval(() => {
    if(gameOver || speed < 10){
       clearInterval(speedInterval); 
    }else{
        speed -= 1;
    }
}, 1000);



function keyUpHandler(event){
    if(event.keyCode === 32){
        if(!isJumping) {
            jump();
        }
    }
} 

function jump(){
    isJumping = true;
    let upInterval = setInterval(() =>{
        if(position >= 150){
            clearInterval(upInterval);
            

            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval)
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + "px";
                }
            }, 20);
            

        }else{
            position += 20;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

document.addEventListener('keyup', keyUpHandler);

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    backGround.appendChild(cactus);

    let leftInterval = setInterval(() => {
        
        cactus.style.left = cactusPosition + 'px';
        cactusPosition -= 10;

        if(cactusPosition > 0 && cactusPosition < 50 && position < 30){
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game_over">GAME OVER</h1><br><p class="score">score: <span>'+ score.innerHTML +'</span></p>'
            gameOver = true;
        }

        if(cactusPosition < -50){
            clearInterval(leftInterval);
            backGround.removeChild(cactus);
        }
        
    }, speed)

    setTimeout(createCactus, randomTime);
}

createCactus();















