"use strict";

var ctx = document.querySelector("canvas").getContext('2d');

var leftMargin = 28;
var rightMargin = 270;

ctx.lineWidth = 5;
ctx.strokeStyle = "#6c88ee";
ctx.strokeRect(10, 10, 280, 560);

ctx.lineWidth = 2;
ctx.strokeStyle = "#4cff8e";
ctx.arc(rightMargin, 26, 4, 0, 6.3, false);
ctx.stroke();