const dino = document.querySelector(".dino"); 
const backGround = document.querySelector('.back_ground');
const score = document.querySelector('.score');
let isJumping = false;
let position = 0;
let gameOver = false;
let speed = 50;

//adicona o evento de keyup que recebe a tecla pressionada pelo usaurio
document.addEventListener('keyup', keyUpHandler);

//função responsavel por aumentar a pontução até chegar ao fim de jogo
let scoreInterval = setInterval(() => {
    if(gameOver){
       clearInterval(scoreInterval); 
    }else{
        scoreValue = parseInt(score.innerHTML);
        score.innerHTML = scoreValue + 1;
    }
}, 30);

//função que aumenta velocidade dos cactus gradativamente até um limite de 10
let speedInterval = setInterval(() => {
    if(gameOver || speed < 10){
       clearInterval(speedInterval); 
    }else{
        speed -= 1;
    }
}, 1000);


//função responsavel por verificar a tecla pressionada e chamar jump casa a mesma seja espaço
function keyUpHandler(event){
    if(event.keyCode === 32){
        if(!isJumping) {
            jump();
        }
    }
} 

//função responsavel por fazer o dinossauro pular
function jump(){
    isJumping = true;
    let upInterval = setInterval(() =>{
        //faz o dinossauro parar de subir nos 150px
        if(position >= 150){
            clearInterval(upInterval);
            
            //faz o dinossauro descer até 0px
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
            //faz o dinossauro subir até um limite de 150px
            position += 20;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

//cria os obstaculos do jogo
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

    //cria um novo obstatulo em intervalos de tempos aleatorios
    setTimeout(createCactus, randomTime);
}

//cria o primeiro cactu
createCactus();















