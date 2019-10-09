document.body.style.backgroundColor = "#545450"


/** drawing tools constant */
const canvas = document.querySelector('.platform');
const context = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 500;

/** goal post constant */
const leftGoalXPos = 8;
const rightGoalXPos = canvas.width - 18;

const goalYPos = canvas.height / 2.5;
const goalWeight = 10;
const goalHeight = 90;

let footballXPos = canvas.width / 2;
let footballYPos = canvas.height / 2;



function draw(color="green") {
    canvas.style.backgroundColor = color;

    // draw left goal
    goalPost(leftGoalXPos, goalYPos, goalWeight, goalHeight);

    // draw right goal
    goalPost(rightGoalXPos, goalYPos, goalWeight, goalHeight);

    // draw lower side line
    drawXSideLine(y=canvas.height - 8, color="#ffffff");

    // draw upper side line
    drawXSideLine();

    // draw left side line
    drawYSideLine();

    // draw right side line
    drawYSideLine(x=canvas.width - 8);

    // draw center component 
    drawCenterComponent();

    // draw football
    drawFootball();

    // takes the place of setInterval but better than it as it quickly
    // re-renders component to be drawn on a canvas
    requestAnimationFrame(draw)

}

/**
 * draws a goal post 
 * @param {Number} x the horizontal position where drawing will begin
 * @param {Number} y the vertical postion where drawing will begin
 * @param {Number} weight the width of the object
 * @param {Number} height the height of the object
 * @param {String} color the color of the object default to white
 */
function goalPost(x, y, width, height, color="#ffffff"){
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.strokeRect(x, y, width, height)
    context.closePath();
    context.stroke();
}

/**
 * draws the horizontal sideline of a field, which in football vanacular is 
 * called throwing line
 * @param {Number} y defines the vertical position of the object
 * @param {String} color initializes the color of the object, default to white
 */
function drawXSideLine(y=8, color="#ffffff"){
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.strokeRect(0, y, canvas.width, 1);
    context.closePath();
    context.stroke();
}

/**
 * draws the vertical sideline of a field, which in football vancular is called
 * corner kick line.
 * @param {Number} x defines the horizontal position of the object
 * @param {String} color initializes the color of the object, default to white
 */
function drawYSideLine(x=8, color="#ffffff"){
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.strokeRect(x, 0, 0, canvas.height);
    context.closePath();
    context.stroke();
}

/**
 * draws the center components of a football field, which is basically
 * the vertical straight line that divides opponents position and the
 * big round circle.
 */
function drawCenterComponent() {
    let midXPos = canvas.width / 2;
    let midYPos = canvas.height / 2;

    // drawing center line
    context.beginPath();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 1;
    context.strokeRect(midXPos, 0, 0.8, canvas.height);
    context.closePath();
    context.stroke();

    // draw the large circle
    let radius = 70;
    context.beginPath();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 3;
    context.arc(midXPos, midYPos, radius, 0, 2 * Math.PI, false);
    context.stroke();

}

/**
 * draws a ball object with the specified x and y position.
 * @param {Number} x defines the horizontal position of ball object
 * @param {Number} y defines the vertical position of ball object
 */
function drawFootball(x=footballXPos, y=footballYPos){
    context.beginPath();
    context.fillStyle = "#30abb1";
    // the size of a ball is fixed as the specified radius is 6
    context.arc(x, y, 6, 0, Math.PI * 2, true);
    context.fill();
    
    context.strokeStyle = "#cddc00";
    context.lineWidth = 0.5
    context.stroke();
    context.closePath();
}


/**
 * moves ball to a new position and clears the previous position of 
 * ball
 * @param {Number} x defines the horizontal position to move a ball to
 * @param {Number} y defines the vertical position to move a ball to
 */
function moveFootball(x, y){
    footballYPos = y;
    footballXPos = x;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawFootball(x, y);
}

/**
 * randomly move football to a new position, which makes it 
 * looks like it's being played.
 */
function simulateMovingFootball(){
    let newXPos, newYPos;
    setInterval(() => {
        newXPos = Math.floor(Math.random() * canvas.width);
        newYPos = Math.floor(Math.random() * canvas.height);
        moveFootball(newXPos, newYPos)
    }, 1500);
}


// calling the draw function
draw();

// calling football simulation
simulateMovingFootball();