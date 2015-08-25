//The validity of these tests depends on all settings tests passing

module.exports = {
	setUp: function(callback) {
		this.colgen = require('../index');
		this.colgen.setSavedValues({'color': 0, 'offset': 0, 'split': 30, 'minSplit':3}); //Default settings
		callback();
	},

	getColor_colorGenerated_algorithmUpdatesSettings: function(test) {
		this.colgen.getColor();
		test.deepEqual(this.colgen.getSavedValues(), 
			{'color': 30, 'offset': 0, 'split': 30, 'minSplit':3}, 
			'The saved specs should be an object with updated settings');
		test.done();
	},

	getColor_singleCall_returnsRGB: function(test) {
		color = this.colgen.getColor();
		test.ok('r' in color && 'g' in color && 'b' in color,
			"Color should be a dictionary containing 'r', 'g', and 'b' keys");
		test.done();
	},

	getColor_colorMaxHit_changesOffsetandSplitResetsColor: function(test) {
		var initial = this.colgen.getSavedValues();
		for (var i = 0; i < 12; i++) { // 12 chosen to max colors causing settings wraparound
			this.colgen.getColor();
		}
		var resulting = this.colgen.getSavedValues();
		test.equal(initial['split']/2, resulting['offset'], 
			'The offset should adjust to reflect already assigned colors')
		test.equal(initial['split']/2, resulting['split'], 
			'The split should be reduced')
		test.equal(initial['minSplit'], resulting['minSplit'], 
			'The minimum split should not be affected')
		test.equal(initial['color'], resulting['color'], 
			'The color should return to inital base color')
		test.done();
	},

	getColor_multipleWraparounds_returnDifferentColors: function(test) {
		var colors = [];
		for (var i = 0; i < 44; i++) { // 44 chosen to get to a split with multiple rounds
			colors.push(this.colgen.getColor());
		}
		for (var i = 1; i < 44; i++) {
			for (var j = 0; j < i; j++) {
				test.notDeepEqual(colors[i], colors[j], 'All colors should be different');
			}	
		}
		test.done();
	},

	tearDown: function(callback) {
		//Restore to default settings
		this.colgen.setSavedValues({'color': 0, 'offset': 0, 'split': 30, 'minSplit':3});
		callback();
	}

};