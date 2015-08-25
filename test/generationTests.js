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

	getColor_colorMaxHitForSplit_changesOffsetandSplitResetsColor: function(test) {
		var initial = {'color': 330, 'offset': 0, 'split': 15, 'minSplit':3}; //15 tests minimum large split
		this.colgen.setSavedValues(initial)
		this.colgen.getColor();
		var resulting = this.colgen.getSavedValues();
		test.equal(initial['split']/2, resulting['offset'], 
			'The offset should adjust to reflect already assigned colors')
		test.equal(initial['split']/2, resulting['split'], 
			'The split should be reduced')
		test.equal(initial['minSplit'], resulting['minSplit'], 
			'The minimum split should not be affected')
		test.equal(0, resulting['color'], 
			'The color should return to base color')
		test.done();
	},

	getColor_colorMaxHitWithSmallSplit_changesOffsetandResetsColor: function(test) {
		var initial = {'color': 330, 'offset': 0, 'split': 7.5, 'minSplit':3}
		this.colgen.setSavedValues(initial)
		this.colgen.getColor();
		var resulting = this.colgen.getSavedValues();
		test.equal(initial['split'] * 2, resulting['offset'], 
			'The offset should adjust to reflect already assigned colors')
		test.equal(initial['split'], resulting['split'], 
			'The split should be reduced')
		test.equal(initial['minSplit'], resulting['minSplit'], 
			'The minimum split should not be affected')
		test.equal(0, resulting['color'], 
			'The color should return to base color')
		test.done();
	},

	getColor_colorMaxHitWithMinimumSplit_resetsToInitialSettings: function(test) {
		var initial = {'color': 330, 'offset': 15, 'split': 7.5, 'minSplit':7}
		this.colgen.setSavedValues(initial)
		this.colgen.getColor();
		var resulting = this.colgen.getSavedValues();
		test.equal(0, resulting['offset'], 
			'The offset should be 0')
		test.equal(30, resulting['split'], 
			'The split should be the color offset')
		test.equal(initial['minSplit'], resulting['minSplit'], 
			'The minimum split should not be affected')
		test.equal(0, resulting['color'], 
			'The color should return to base color')
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