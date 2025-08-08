const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Game objects
const paddleWidth = 12;
const paddleHeight = 90;
const ballSize = 14;

// Left paddle (player)
const leftPaddle = {
    x: 0,
    y: HEIGHT / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    speed: 0
};

// Right paddle (AI)
const rightPaddle = {
    x: WIDTH - paddleWidth,
    y: HEIGHT / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    speed: 4
};

// Ball
const ball = {
    x: WIDTH / 2 - ballSize / 2,
    y: HEIGHT / 2 - ballSize / 2,
    size: ballSize,
    speedX: 5 * (Math.random() > 0.5 ? 1 : -1),
    speedY: 3 * (Math.random() > 0.5 ? 1 : -1)
};

// Scores
let leftScore = 0;
let rightScore = 0;

// Draw everything
function draw() {
    // Clear
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Net
    ctx.fillStyle = '#00ff99';
    for(let i = 0; i < HEIGHT; i += 30) {
        ctx.fillRect(WIDTH/2-2, i, 4, 20);
    }

    // Left paddle
    ctx.fillStyle = '#fff';
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

    // Right paddle
    ctx.fillStyle = '#fff';
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    // Ball
    ctx.fillStyle = '#00ff99';
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

    // Scores
    ctx.font = '32px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText(leftScore, WIDTH/2 - 60, 50);
    ctx.fillText(rightScore, WIDTH/2 + 60, 50);
}

// Move right paddle (simple AI)
function moveAIPaddle() {
    const paddleCenter = rightPaddle.y + rightPaddle.height/2;
    if (paddleCenter < ball.y) {
        rightPaddle.y += rightPaddle.speed;
    } else if (paddleCenter > ball.y + ball.size) {
        rightPaddle.y -= rightPaddle.speed;
    }

    // Keep paddle within bounds
    if (rightPaddle.y < 0) rightPaddle.y = 0;
    if (rightPaddle.y + rightPaddle.height > HEIGHT) rightPaddle.y = HEIGHT - rightPaddle.height;
}

// Move ball
function moveBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Top/bottom wall collision
    if (ball.y < 0) {
        ball.y = 0;
        ball.speedY *= -1;
    } else if (ball.y + ball.size > HEIGHT) {
        ball.y = HEIGHT - ball.size;
        ball.speedY *= -1;
    }

    // Left paddle collision
    if (
        ball.x <= leftPaddle.x + leftPaddle.width &&
        ball.y + ball.size >= leftPaddle.y &&
        ball.y <= leftPaddle.y + leftPaddle.height
    ) {
        ball.x = leftPaddle.x + leftPaddle.width;
        ball.speedX *= -1;
        // Add variation based on where it hit the paddle
        let collidePoint = (ball.y + ball.size/2) - (leftPaddle.y + leftPaddle.height/2);
        collidePoint = collidePoint / (leftPaddle.height/2);
        ball.speedY = 5 * collidePoint;
    }

    // Right paddle collision
    if (
        ball.x + ball.size >= rightPaddle.x &&
        ball.y + ball.size >= rightPaddle.y &&
        ball.y <= rightPaddle.y + rightPaddle.height
    ) {
        ball.x = rightPaddle.x - ball.size;
        ball.speedX *= -1;
        let collidePoint = (ball.y + ball.size/2) - (rightPaddle.y + rightPaddle.height/2);
        collidePoint = collidePoint / (rightPaddle.height/2);
        ball.speedY = 5 * collidePoint;
    }

    // Left wall (AI scores)
    if (ball.x < 0) {
        rightScore++;
        resetBall();
    }

    // Right wall (Player scores)
    if (ball.x + ball.size > WIDTH) {
        leftScore++;
        resetBall();
    }
}

// Reset ball to center
function resetBall() {
    ball.x = WIDTH / 2 - ballSize / 2;
    ball.y = HEIGHT / 2 - ballSize / 2;
    ball.speedX = 5 * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = 3 * (Math.random() > 0.5 ? 1 : -1);
}

// Mouse control for left paddle
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    let mouseY = e.clientY - rect.top;
    leftPaddle.y = mouseY - leftPaddle.height/2;
    // Stay within bounds
    if (leftPaddle.y < 0) leftPaddle.y = 0;
    if (leftPaddle.y + leftPaddle.height > HEIGHT) leftPaddle.y = HEIGHT - leftPaddle.height;
});

// Main loop
function gameLoop() {
    moveBall();
    moveAIPaddle();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();