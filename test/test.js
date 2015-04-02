var assert = require('chai').assert;
var expect = require('chai').expect;
var colgen = require('../colorassignmentgen');

var colors = [];
for (var i = 0; i < 36; i++) {
	colors.push(colgen.getColor());
};

assert.typeOf(colors[0], 'object', 'The color is an object');
assert.lengthOf(Object.keys(colors[0]), 3, 'The color should contain 3 keys');

for (var i = 1; i < 36; i++) {
	for (var j = 0; j < i; j++) {
		expect(colors[i]).to.exist;
		expect(colors[i]).to.not.equal(colors[j]);
	}	
}