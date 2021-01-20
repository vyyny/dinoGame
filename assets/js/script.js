const dino = document.querySelector(".dino");



function keyUpHandler(event){
    if(event.keyCode === 32){
        jump();
    }
} 

function jump(){
    let position = 0;

    let upInterval = setInterval(() =>{
        if(position >= 150){
            clearInterval(upInterval);
            

            let downInterval = setInterval(() => {
                position += 20;
                dino.style.bottom = position + "px";
            }, 20);
            

        }else{
            position += 20;
            dino.style.bottom = position + "px";
        }
    }, 20);
}


document.addEventListener('keyup', keyUpHandler);















