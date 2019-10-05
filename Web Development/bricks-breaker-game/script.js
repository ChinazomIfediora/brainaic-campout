const canvas = document.getElementById('my_canvas');
const ctx = canvas.getContext('2d');

// ball default config
const BALL_OBJECT = {
    ballRadius : 10,
    x : canvas.clientWidth / 2,
    y : canvas.clientHeight - 30,
    dx : 2,
    dy : -2,
}


// paddle default config
const PADDLE_OBEJCT = {
    paddleHeight : 10,
    paddleWidth : 75,
    paddleX : (canvas.width - paddleWidth) / 2,
}


// bricks default config
const BRICK_OBJECT = {
    brickRowCount : 5,
    brickColumnCount : 3,
    brickHeight : 20,
    brickPadding : 10,
    brickOffSetTop : 30,
    brickOffSetLeft : 30
};


// track game default config
const PLAYER_OBJECT = {
    score : 0,
    lives : 3,
}

const brick = [];