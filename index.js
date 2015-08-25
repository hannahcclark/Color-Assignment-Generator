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

exports.getSavedValues = function () {
	return {'color': color, 'offset': offset, 'split': split, 'minSplit':minSplit}
};

/* All saved values are required in the dictionary
 * Color, offset, and split must not be zero
 * If split is less than the minimum split or greater than the color offset, 
 * it will default to the color offset
 * It is recommended that the split be of the form 30/(2^n). Behavior is not defined otherwise.
 * The minimum split will default to 0 if less than 0 or the color offset if greater than the offset.
 */

exports.setSavedValues = function (dict) {
	if (!('color' in dict) || !('offset' in dict) || !('split' in dict) || !('minSplit' in dict) ||
		dict.color < 0 || dict.offset < 0 || dict.split < 0) {
		throw 'Invalid parameter value';
	}
	color = Math.round(dict.color/ nextColorOffset) * nextColorOffset;
	if (color > 330) {
		color %= 330;
	}
	offset = dict.offset % nextColorOffset;
	exports.setMinimumDifference(dict.minSplit);
	if (dict.split < minSplit || dict.split > nextColorOffset) {
		split = nextColorOffset;
	}
	else {
		split = dict.split;
	}
};

// The minimum split will default to 0 if less than 0 or the color offset if greater than the offset.
exports.setMinimumDifference = function (newMin) {
	if (newMin < 0) {
		minSplit = 0;
	}
	else if (newMin > nextColorOffset) {
		minSplit = nextColorOffset
	}
	else {
		minSplit = newMin
	}
};

exports.getColor = function() {
	var H = color + offset;
	genColor = tinycolor("hsv(" + H + ", 100%, 100%)").toRgb();
	color += nextColorOffset;
	if (color > maxColor) { //When all colors have been used for the combo, change the offset
		color = minColor;
		offset += split * 2; //Jumps over already assigned offsets (previous split values)
		if(offset >= nextColorOffset) { // If the offset overflows into next color, adjust split
			split /= 2;
			offset = split; // With a new split, offset begins at the split
			if (split < minSplit) { //If cannot split, wrap around
				split = nextColorOffset;
				offset = 0;
			}
		}
	}
	return {"r":genColor.r, "g":genColor.g, "b": genColor.b};
};