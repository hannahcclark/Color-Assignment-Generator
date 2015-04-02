var tinycolor = require('tinycolor2');

//Constant Values
var maxColor = 330;
var minColor = 0;
var nextColorOffset = 30;

//Global Variables that are not changed during algorithm
var minSplit = 3;

//Changing Global Variables
var color = 0;
var split = nextColorOffset;
var offset = 0;

exports.getColor = function() {
	var H = color + offset;
	genColor = tinycolor("hsv(" + H + ", 100%, 100%)").toRgb();
	color += nextColorOffset;
	if (color > maxColor) {
		color = minColor;
		offset += split * 2; //Jumps over already assigned offsets
		if(offset >= nextColorOffset) {
			split /= 2;
			offset = split;
			if (split < minSplit) {
				split = nextColorOffset;
				offset = 0;
			}
		}
	}
	return {"r":genColor.r, "g":genColor.g, "b": genColor.b};
};