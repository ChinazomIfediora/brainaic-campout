'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Retrieving a 2d object for drawing shapes within a canvas
var ctx = document.querySelector('canvas').getContext('2d');

var GAME_FRAME = {
	width: 280,
	height: 560,

	// game area and margins
	frameLeftMargin: 20,
	frameTopMargin: 20,
	frameRightMargin: 264,
	frameBottomMargin: 535,

	drawGameArea: function drawGameArea(context) {
		context.strokeStyle = '#6c88ee';
		context.strokeRect(10, 10, this.width, this.height);
	},

	clearGameArea: function clearGameArea(context) {
		context.clearRect(this.frameLeftMargin - 5, this.frameTopMargin - 5, this.frameRightMargin + 5, this.frameBottomMargin);

		this.drawGameArea(context);
	},

	drawSlider: function drawSlider(context) {
		context.beginPath();

		context.lineWidth = 1;
		context.strokeStyle = '#9bfbf2';
		context.rect(Math.floor(this.width / 2), this.frameBottomMargin + 22, 40, 5);

		context.closePath();
		context.stroke();
	},

	clearSliderArea: function clearSliderArea(context) {
		context.clearRect(this.frameLeftMargin - 5, this.frameBottomMargin + 20, this.frameRightMargin + 5, this.height - this.frameBottomMargin - 12);
	}
};

var Circle = function () {
	/**
  * @param {String} sColor the outline color of the circle instance
  * @param {Integer} r the size of the circle instance
  * @param {Object} frameObject the game play area object
  * @param {Object} context An object for drawing 2d shapes within a canvas
  */
	function Circle(sColor, frameObject, context) {
		_classCallCheck(this, Circle);

		this.FRAME_OBJECT = frameObject;
		this.strokeColor = sColor;
		this.context = context;

		this.lineWidth = Math.floor(Math.random() * 2) + 1;
		this.radius = Math.floor(Math.random() * 8) + 1;
		this.xPosition = this.generateXPosition();
		this.yPosition = this.FRAME_OBJECT['frameTopMargin'];

		// sets the lineWith of the circle to the auto generated lineWidth property
		this.context.lineWidth = this.lineWidth;

		this.validateXPosition();

		/**
   *
   * a circle tends to grow based on the size of its radius.
   * To make sure a cirlce doesn't touch the game frame left margin:
   * 	   The auto generated radius will be  added to the horizontal position of the circle
   * To make sure a circle doesn't touch the game frame top margin:
   * 	   The auto generated radius will be added to the vertical position of the circle
   * To make sure a circle doesn't touch the game frame right margin:
   * 	   The auto generated will be reduced reduced from the horizontal position of the circle
   */

		if (this.xPosition === this.FRAME_OBJECT['frameRightMargin']) {
			this.xPosition = this.xPosition - this.radius;
		} else {
			this.xPosition = this.xPosition + this.radius;
		}

		this.yPosition = this.yPosition + this.radius;
	}

	/**
  * generates an horizontal position for a cirlce
  */


	_createClass(Circle, [{
		key: 'generateXPosition',
		value: function generateXPosition() {
			return Math.floor(Math.random() * this.FRAME_OBJECT['frameRightMargin']);
		}

		/**
   * validate that the horinzontal position of a circle is within the game area.
   */

	}, {
		key: 'validateXPosition',
		value: function validateXPosition() {
			if (this.xPosition < this.FRAME_OBJECT['frameLeftMargin']) {
				this.xPosition = this.FRAME_OBJECT['frameLeftMargin'];
			}
			if (this.xPosition > this.FRAME_OBJECT['frameRightMargin']) {
				this.xPosition = this.FRAME_OBJECT['frameRightMargin'];
			}
		}

		/**
   *
   * validates if a circle's vertical position has'nt exceeds game frame bottom
   * margin
   */

	}, {
		key: 'atBottomMargin',
		value: function atBottomMargin() {
			var flag = false;
			if (this.yPosition < this.FRAME_OBJECT['frameBottomMargin']) {
				flag = false;
			}
			if (this.yPosition >= this.FRAME_OBJECT['frameBottomMargin']) {
				flag = true;
			}
			return flag;
		}

		/**
   * returns the horizontal position of a circle
   */

	}, {
		key: 'getXPosition',
		value: function getXPosition() {
			return this.xPosition;
		}

		/**
   * increase the vertical position of a circle
   */

	}, {
		key: 'updateYPosition',
		value: function updateYPosition() {
			this.yPosition = this.yPosition + 8;
		}

		/**
   * returns the vertical position of a circle
   */

	}, {
		key: 'getYPosition',
		value: function getYPosition() {
			this.updateYPosition();
			return this.yPosition;
		}
	}, {
		key: 'clear',
		value: function clear() {
			// clear drawing area
			this.FRAME_OBJECT.clearGameArea(this.context);
		}

		/**
   * draws a circle on the on the game play area
   */

	}, {
		key: 'draw',
		value: function draw() {
			this.context.beginPath();

			this.context.arc(this.xPosition, this.yPosition, this.radius, 0, 20, false);

			this.context.closePath();
			this.context.stroke();
		}
	}, {
		key: 'remove',
		value: function remove() {
			if (this.atBottomMargin() === true) {
				this.context = null;
				this.FRAME_OBJECT = null;
			}
		}

		/**
   * this moves a circle from top to bottom of the game frame.
   */

	}, {
		key: 'fallDown',
		value: function fallDown() {
			var _this = this;

			var fallInterval = setInterval(function () {
				_this.clear(); // clear the game area

				if (_this.atBottomMargin() === true) {
					// stop the current running interval and remove all circle drawing
					// tools when circle is at the bottom of game playing area
					clearInterval(fallInterval);
					_this.remove();
				} else {
					// keep updating circle's veritcal position and keep drawing a circle
					// until the circle gets to the bottom of game playing area
					_this.updateYPosition();
					_this.draw();
				}
			}, 300);
		}
	}]);

	return Circle;
}();

var Slider = function () {
	/**
  *
  * @param {String} sColor slider outline color
  * @param {Object} frameObject game play area
  * @param {Object} context An object for drawing 2d shapes within a canvas
  */
	function Slider(sColor, frameObject, context) {
		_classCallCheck(this, Slider);

		this.FRAME_OBJECT = frameObject;
		this.context = context;
		this.strokeColor = sColor;

		// horizontal & vertical position
		this.xPos = Math.floor(this.FRAME_OBJECT.frameRightMargin / 2);
		this.yPos = this.FRAME_OBJECT.frameBottomMargin + 22;

		// width & height
		this.width = 40;
		this.height = 5;

		// controls
		this.controlKeys = ['ArrowLeft', 'ArrowRight'];
	}

	/**
  * returns a slider horizontal position
  */


	_createClass(Slider, [{
		key: 'getXPosition',
		value: function getXPosition() {
			return this.xPos;
		}

		/**
   *
   * @param {Event} event checks if an event object whose key property is contained in
   * control keys
   */

	}, {
		key: 'validateKey',
		value: function validateKey(event) {
			return this.controlKeys.filter(function (i) {
				return event['key'] === i;
			});
		}

		/**
   * clear slider game area and redraw slider in it's news horizontal
   * position while maintaining it's vertical position
   */

	}, {
		key: 'draw',
		value: function draw() {
			// clear slider area
			this.FRAME_OBJECT.clearSliderArea(this.context);

			// draw slider
			this.context.beginPath();
			this.context.lineWidth = 1;
			this.context.strokeStyle = this.strokeColor;
			this.context.rect(this.getXPosition(), this.yPos, this.width, this.height);
			this.context.closePath();

			this.context.stroke();
		}

		/**
   * moves slider right and making sure slider does not go beyound
   * right margin of game play area
   */

	}, {
		key: 'moveRight',
		value: function moveRight() {
			if (this.xPos > this.FRAME_OBJECT.frameRightMargin - this.width + 12) {
				// make the x position same as the right margin of game play area
				this.xPos = this.FRAME_OBJECT.frameRightMargin - this.width + 12;
			} else {
				// increment the width so it wouldn't overlap on game play area
				this.xPos = this.xPos + 4;
			}
		}

		/**
   * moves slider left and making sure slider does not go beyound
   * left margin of game play area
   */

	}, {
		key: 'moveLeft',
		value: function moveLeft() {
			if (this.xPos < this.FRAME_OBJECT.frameLeftMargin) {
				// make the x position same as the left margin of game play area
				this.xPos = this.FRAME_OBJECT.frameLeftMargin;
			} else {
				// deduct just the width so it wouldn't overlap on game play area
				this.xPos = this.xPos - 4;
			}
		}

		/**
   *
   * @param {String} color set slider's stroke color
   */

	}, {
		key: 'setStrokeColor',
		value: function setStrokeColor(color) {
			this.strokeColor = color;
		}

		/**
   * return slider's stroke color
   */

	}, {
		key: 'getStrokeColor',
		value: function getStrokeColor() {
			return this.strokeColor;
		}

		/**
   * controls the movement of a slider
   * @param {Object} event an event object
   */

	}, {
		key: 'move',
		value: function move(event) {
			var key = this.validateKey(event);

			switch (key.toString()) {
				case 'ArrowRight':
					this.moveRight();
					this.draw();
					break;

				case 'ArrowLeft':
					this.moveLeft();
					this.draw();
					break;

				default:
					break;
			}
		}
	}]);

	return Slider;
}();

var playGame = function playGame() {
	GAME_FRAME.drawGameArea(ctx); // drawing the game area
	var slider = new Slider('#9bfbf2', GAME_FRAME, ctx);
	slider.draw();

	document.addEventListener('keydown', function (e) {
		slider.move(e);
	});

	// create a falling circle
	var circle = new Circle('#5c3c8e', GAME_FRAME, ctx);
	circle.draw();
	circle.fallDown();
};

playGame();