document.body.style.backgroundColor = '#545450';

/** drawing tools constant */
const canvas = document.querySelector('.platform');
const context = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 500;

/** goal post constant */
const leftGoalXPos = 8;
const rightGoalXPos = canvas.width - 18;
const goalYPos = canvas.height / 2.5;
const goalWidth = 10;
const goalHeight = 90;

/** football initializers */
let footballXPos = canvas.width / 2;
let footballYPos = canvas.height / 2;

/** sideline constant */
const padSideline = 8; // pads the sideline into the visible field area

/**
 * The value of padSideline is same as
 * topSideline(vertically) & leftSideline(horizontally)
 */

// vertical position ends at the value of canvas.height, so to make the
// sideline visible, there is need to deduct the padSideline from the
// value of canvas.height
const bottomSideLine = canvas.height - padSideline; // vertically

// horizontal position ends at the value of canvas.width, so to make the
// sideline visible, there is need to deduct the padSideline from the
// value of canvas.width
const rightSideLine = canvas.width - padSideline; // horizontally

// simulation interval constant
let simulationIntervalFlag = true;

// info message constant
const messageXPos = canvas.width / 2.5 + 8;
const messageYPos = padSideline + 30;

// corner flaging constant
let isCorner = false
// the above immediate constant is set, because we don't want 
// Goal Scored to display when a Corner is displayed. Becuase
// sometimes a ball can go above the goal post, to become a 
// corner, that doesn't mean it's a goal scored.

function draw(color = '#317131') {
	canvas.style.backgroundColor = color;

	// draw left goal
	goalPost(leftGoalXPos, goalYPos, goalWidth, goalHeight);

	// draw right goal
	goalPost(rightGoalXPos, goalYPos, goalWidth, goalHeight);

	// draw lower side line
	drawXSideLine((y = bottomSideLine), (color = '#ffffff'));

	// draw upper side line
	drawXSideLine(); // uses the default values

	// draw left side line
	drawYSideLine(); // uses the default values

	// draw right side line
	drawYSideLine((x = rightSideLine));

	// draw center component
	drawCenterComponent();

	// draw football
	drawFootball();

	// takes the place of setInterval but better than it as it quickly
	// re-renders component to be drawn on a canvas
	requestAnimationFrame(draw);
}

/**
 * draws a goal post
 * @param {Number} x the horizontal position where drawing will begin
 * @param {Number} y the vertical postion where drawing will begin
 * @param {Number} weight the width of the object
 * @param {Number} height the height of the object
 * @param {String} color the color of the object default to white
 */
function goalPost(x, y, width, height, color = '#ffffff') {
	context.beginPath();
	context.strokeStyle = color;
	context.lineWidth = 2;
	context.strokeRect(x, y, width, height);
	context.closePath();
	context.stroke();
}

/**
 * draws the horizontal sideline of a field, which in football vanacular is
 * called throwing line
 * @param {Number} y defines the vertical position of the object
 * @param {String} color initializes the color of the object, default to white
 */
function drawXSideLine(y = padSideline, color = '#ffffff') {
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
function drawYSideLine(x = padSideline, color = '#ffffff') {
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
	context.strokeStyle = '#ffffff';
	context.lineWidth = 1;
	context.strokeRect(midXPos, 0, 0.8, canvas.height);
	context.closePath();
	context.stroke();

	// draw the large circle
	let radius = 70;
	context.beginPath();
	context.strokeStyle = '#ffffff';
	context.lineWidth = 3;
	context.arc(midXPos, midYPos, radius, 0, 2 * Math.PI, false);
	context.stroke();
}

/**
 * draws a ball object with the specified x and y position.
 * @param {Number} x defines the horizontal position of ball object
 * @param {Number} y defines the vertical position of ball object
 */
function drawFootball(x = footballXPos, y = footballYPos) {
	context.beginPath();
	context.fillStyle = '#30abb1';
	// the size of a ball is fixed as the specified radius is 6
	context.arc(x, y, 6, 0, Math.PI * 2, true);
	context.fill();

	context.strokeStyle = '#cddc00';
	context.lineWidth = 0.5;
	context.stroke();
	context.closePath();
}

/**
 * moves ball to a new position and clears the previous position of
 * ball
 * @param {Number} x defines the horizontal position to move a ball to
 * @param {Number} y defines the vertical position to move a ball to
 */
function moveFootball(x, y) {
	footballYPos = y;
	footballXPos = x;
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawFootball(x, y);
}

/**
 * displays information about the activity in a match
 * @param {String} message information to be displayed
 */
function displayMessage(message) {
	context.font = '24px serif';
	context.fillStyle = '#ff7600';
	context.fillText(message, messageXPos, messageYPos);
}

/**
 * checks if there is a throwin. Throwin occurs when a ball goes
 * beyond the vertical lines.
 */
function checkThrowIn() {
	// we'll only be checking for vertical position of the football
	if (footballYPos < padSideline || footballYPos > bottomSideLine) {
		displayMessage('Throw In');
		simulationIntervalFlag = false;
		setTimeout(() => {
			simulationIntervalFlag = true;
		}, 3000);
	}
}

/**
 * checks if there is a corner kick. Corner Kick occurs when a ball goes
 * beyond the horizontal lines.
 */
function checkCornerKick() {
	// we'll only be checking for vertical position of the football
	if (footballXPos < padSideline || footballXPos > rightSideLine) {
        displayMessage('Corner');

        // set to true so that Goal scored will not be displayed, when 
        // the ball position for corner kick is same/relative as the goal post
        // position. A ball can go over the bar, to be a corner kick, that doesn't
        // me it's a goal scored
        isCorner = true;
		simulationIntervalFlag = false;
		setTimeout(() => {
			simulationIntervalFlag = true;
        }, 3000);
	}
}

function checkGoalScore() {
	// we'll only be checking for horizontal position relative to the
	// vertical space covered by the goal post

	// to compute a score we'll need to check if the ball is within the
	// vertical start position of the goal post and the vertical end
	// position of the goal post

	// both (left & right) have same vertical start and  vertical end
	// position
	let goalVerticalStartPosition = goalYPos;
	let goalVerticalEndPosition = goalYPos + goalHeight;

	// we also need to get the width of a goal post, as we only want to
	// record a goal when the ball passes the first vertical bar of the
	// goal post with the field area
	// we'll need the start and end position also

	let leftGoalHorizontalStartPosition = 0; // left
	let leftGoalHorizontalEndPosition = goalWidth; // to right

	let rightGoalHorizontalStartPosition = rightGoalXPos; // left
	let rightGoalHorizontalEndPosition = rightGoalXPos + goalWidth; // to right

	if (
		footballXPos >= leftGoalHorizontalStartPosition &&
        footballXPos <= leftGoalHorizontalEndPosition
        ||
        footballXPos >= rightGoalHorizontalStartPosition && 
        footballXPos <= rightGoalHorizontalEndPosition
	) {
		// if the above check passes, it means the football within the vertical width range of either the
		// left goal post or the right goal post
		if (
			footballYPos >= goalVerticalStartPosition &&
			footballYPos <= goalVerticalEndPosition
		) {
			// if the above check passes, it means football is between the length of
            // of a goal post for
            if(isCorner != true){
                // the the above check passes, it means the football did not go above the
                // the goal post that would have made it to be a corner kick instead of goal scored.
                displayMessage('Goal Scored');
                simulationIntervalFlag = false;
                setTimeout(() => {
                    simulationIntervalFlag = true;
                }, 3000);
            }
		}
	}
}

/**
 * randomly move football to a new position, which makes it
 * looks like it's being played.
 */
function simulateMovingFootball() {
	let newXPos, newYPos;
	setInterval(() => {
		if (simulationIntervalFlag === true) {
			newXPos = Math.floor(Math.random() * canvas.width);
			newYPos = Math.floor(Math.random() * canvas.height);

            
            // only uncomment the below newXPos and newYPos if you want to
            // check that the goalScore functionality works

            // test goalScore functionality for left goal post
            
			// newXPos = 9;
            // newYPos = goalYPos + 8;

            // test goalScore functionality for right goal post

            // newXPos = rightGoalXPos + 5;
            // newYPos = goalYPos + 8;

            // test that corner is displayed wen the ball goes beyond
            // the same position of the goal post, in cases when the ball
            // goes beyond the bar (goal post bar), it shouldn't be calculated
            // as a goal scored

            // test that for left goal post

            // newXPos = 1;
            // newYPos = goalYPos + 8;

            // test for right goal post
            // newXPos = rightGoalXPos + 15;
            // newYPos = goalYPos + 8;

			moveFootball(newXPos, newYPos);
			checkThrowIn();
			checkCornerKick();
            checkGoalScore();

            // as corner kick has been played already, should in case 
            // there was any during simulation. 
            // this variable can only be set to true within the 
            // checkCornerKick() function, and is a global variable.
            isCorner = false;
		}
	}, 1500);
}

// calling the draw function
draw();

// calling football simulation
simulateMovingFootball();
