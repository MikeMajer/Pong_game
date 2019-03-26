const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');




/////Variable
let playerScore = 0;
let aiScore = 0;

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

// sieze of the ball
const paddleHeight = 100;
const paddleWidth = 20;
const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

const playerX = 70;
const aiX = 910;

let playerY = 261;
let aiY = 200;
const lineWidth = 6;
const lineHeight = 15;

let ballSpeedX = 3;
let ballSpeedY = 3;

/////Function



function player() {

    ctx.fillStyle = 'green'
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}
function ai() {

    ctx.fillStyle = 'yellow'
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}

function reset() {
    ballX = cw / 2 - ballSize / 2;
    ballY = ch / 2 - ballSize / 2;
    ballSpeedX = 3;
    ballSpeedY = 3;
}

function ball() {



    ctx.fillStyle = 'white'
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
        speedUp();
    }

    if (ballX <= 0) {
        reset()
        aiScore++;
    } else if (ballX + ballSize >= cw) {
        playerScore++;
        reset()
    }


}

function table() {
    // Table
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);
    //Line in the midlle

    for (let linePosition = 20; linePosition < ch; linePosition += 30) {

        ctx.fillStyle = "grey";
        ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight)
    }

}

topCanvas = canvas.offsetTop;
// console.log(topCanvas)

function playerPosition(e) {
    // console.log('mouse positon ' + (e.clientY - topCanvas));
    playerY = e.clientY - topCanvas - paddleHeight / 2;

    if (ballX - paddleWidth <= playerX && ballY >= playerY - ballSize && ballY <= playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (playerY >= ch - paddleHeight) {
        playerY = ch - paddleHeight
    }

    else if (playerY <= 0) {
        playerY = 0
    }

}

function speedUp() {
    //Speed X
    if (ballSpeedX > 0 && ballSpeedX < 16) {
        ballSpeedX += .3;
    }
    else if (ballSpeedX < 0 && ballSpeedX > -16) {
        ballSpeedX -= .3;
    }
    //Speed Y
    if (ballSpeedY > 0 && ballSpeedY < 16) {
        ballSpeedY += .2;
    }
    else if (ballSpeedY < 0 && ballSpeedY > -16) {
        ballSpeedY -= .2;
    }
}

// AI

function aiPosition() {

    const middlePaddle = aiY + paddleHeight / 2;
    const middleBall = ballY + ballSize / 2;

    if (ballX + ballSize >= aiX && ballY >= aiY - ballSize && ballY <= aiY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX > 500) {
        if (middlePaddle - middleBall > 200) {
            aiY -= 20;
        }
        else if (middlePaddle - middleBall > 50) {
            aiY -= 10;
        }
        else if (middlePaddle - middleBall < -200) {
            aiY += 20;
        }
        else if (middlePaddle - middleBall < -50) {
            aiY += 10;
        }
    }
    else if (ballX <= 500 && ballX > 150) {
        if (middlePaddle - middleBall > 100) {
            aiY -= 3;
        }
        else if (middlePaddle - middleBall < -100) {
            aiY += 3;
        }
    }
}

function text() {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(playerScore, 420, 50);


    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(aiScore, 550, 50);
}

canvas.addEventListener("mousemove", playerPosition)

function game() {
    table()
    ball()
    player()
    ai()
    aiPosition()
    text()
}

setInterval(game, 1000 / 60)