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


function draw(color="green") {
    canvas.style.backgroundColor = color;

    // draw left goal
    goalPost(leftGoalXPos, goalYPos, goalWeight, goalHeight);

    // draw right goal
    goalPost(rightGoalXPos, goalYPos, goalWeight, goalHeight);

    // draw lower side line
    drawSideLine(y=canvas.height - 8, color="#ffffff");

    // draw upper side line
    drawSideLine();

    // draw center component 
    drawCenterComponent();

}

function goalPost(x, y, weight, height, color="#ffffff"){
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.strokeRect(x, y, weight, height)
    context.closePath();
    context.stroke();
}

function drawSideLine(y=8, color="#ffffff"){
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.strokeRect(0, y, canvas.width, 1);
    context.closePath();
    context.stroke();
}

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


draw()