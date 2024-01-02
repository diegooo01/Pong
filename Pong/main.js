const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");

const WINDOW_HEIGHT = 425;
const WINDOW_WIDTH = 710;

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;

const random_y = Math.random()*(400 - 25) +25; 

let p1 = 0;
let p2 = 0;

let name1 = prompt("Cual es el nombre del jugador 1 ? (IZQUIERDA)");
let name2 = prompt("Cual es el nombre del jugador 2 (DERECHA)?");

class Object{
    constructor(x,y, width, height, dx, dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
    }
    //For both
    draw(){
        context.fillStyle = 'white';
        context.fillRect(this.x,this.y,this.width,this.height);
    }
    //For the square (enemy)
    update() {
        this.draw();
    
        if (this.y < 0 || this.y + this.height >= WINDOW_HEIGHT) this.dy = -this.dy;
        
        this.x += this.dx;
        this.y += this.dy;
    }
    //For square:
    collision(object){
        if(this.x <= object.x + object.width && this.x + this.width >= object.x && this.y <= object.y + object.height && this.y + this.height >= object.y){
            this.dx = -this.dx;
            this.dy = Math.random()* 4 - 3.85;
        }
    }
}

let player1 = new Object(20, (WINDOW_HEIGHT/2)-25, 10, 30, 0, 7);
let player2 = new Object(WINDOW_WIDTH-20*2, (WINDOW_HEIGHT/2)-25, 10, 30, 0, 7)
let enemy = new Object(WINDOW_WIDTH/2, random_y, 10, 10, 2, 4);

const drawMiddleLine = ()=>{
    let y = 0;
    let h = 25;
    for(let i = 0; i<10; i++){
        context.fillStyle = 'white';
        context.fillRect(350, y, 10, h);

        y += h*2;
    }
}

const score = () => {
    if (enemy.x <= 0) {
        p2 += 1;
        enemy.x = WINDOW_WIDTH/2;
        enemy.y = random_y;
    }

    if (enemy.x >= WINDOW_WIDTH - enemy.width) {
        p1 += 1;
        enemy.x = WINDOW_WIDTH/2;
        enemy.y = random_y;
    }

    let scoreHtml = `
        <div class="player1"><h3>${name1}: ${p1}</h3></div>
        <div class="player2"><h3>${name2}: ${p2}</h3></div>`;

    document.querySelector(".score").innerHTML = scoreHtml;
};

const keydown1 = (e)=>{
    if(e.key == 'w' && player1.y > 0) player1.y -= player1.dy;
    if(e.key == 's' && player1.y + player1.height < WINDOW_HEIGHT) player1.y += player1.dy;
};

const keydown2 = (e)=>{
    if(e.key == 'o' && player2.y > 0) player2.y -= player2.dy;
    if(e.key == 'l' && player2.y + player2.height < WINDOW_HEIGHT) player2.y += player2.dy;
};

document.addEventListener('keydown',keydown1);
document.addEventListener('keydown',keydown2);

const result = ()=>{

    if(p1 == 10 || p2 == 10){
        return true;
    } else{
        return false;
    }
};

const game = ()=>{
    if(result() == false){
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawMiddleLine();
        score();
        enemy.collision(player1);
        enemy.collision(player2);
        player1.draw();
        player2.draw();
        enemy.draw();
        enemy.update();
        requestAnimationFrame(game);
    } else{
        if(p1 == 10){
            canvas.style.background = 'green';
            let scoreHtml = `<div class="winner1"><h3>FELICIDADES ${name1}, GANASTE!</h3></div>`;
            document.querySelector(".score").innerHTML = scoreHtml;
        } else if (p2 == 10){
            canvas.style.background = 'red';
            let scoreHtml = `<div class="winner2"><h3>FELICIDADES ${name2}, GANASTE!</h3></div>`;
            document.querySelector(".score").innerHTML = scoreHtml;
        };
    };
};

game();