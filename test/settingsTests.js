module.exports = {
	setUp: function(callback) {
		this.colgen = require('../index');
		callback();
	},

	getSavedValues_callBeforeGeneration_returnsInitialSettings: function(test) {
		test.deepEqual(this.colgen.getSavedValues(), 
			{'color': 0, 'offset': 0, 'split': 30, 'minSplit':3}, 
			'The saved specs should be an object with the inital settings');
		test.done();
	},

	setSavedValues_newSettingsProvided_updatesSettings: function(test) {
		var initial = this.colgen.getSavedValues();
		this.colgen.setSavedValues({'color': 30, 'offset': 15, 'split': 15, 'minSplit':1});
		var resulting = this.colgen.getSavedValues();
		test.notDeepEqual(resulting, initial, 
			'The initial settings and current settings should be different');
		test.equal(resulting.minSplit, 1, 'The minSplit should be the new value');
		test.equal(resulting.split, 15, 'The split should be the new value');
		test.equal(resulting.color, 30, 'The color should be the new value');
		test.equal(resulting.offset, 15, 'The offset should be the new value');
		test.done();
	},

	setSavedValues_valueMissing_throwsError: function(test) {
		test.throws(function() {
				this.colgen.setSavedValues({'color': 30, 'offset': 0, 'split': 30});
			},
			'Invalid parameter value', 'A missing value should throw parameter error');
		test.done()
	},

	setSavedValues_valueToLow_throwsError: function(test) {
		test.throws(function() {
				this.colgen.setSavedValues({'color': -30, 'offset': 0, 'split': 30, 'minSplit':3});
			},
			'Invalid parameter value', 'A negative value should throw parameter error');
		test.done()
	},

	setSavedValues_offsetToHigh_modsByColorOffset: function(test) {
		this.colgen.setSavedValues({'color': 0, 'offset': 31, 'split': 30, 'minSplit':-1});
		test.equal(this.colgen.getSavedValues().offset, 1, 'The offset should be 1');
		test.done()
	},

	setSavedValues_colorNotMultipleOfThirty_colorSetToClosestMulitiple: function(test) {
		this.colgen.setSavedValues({'color': 20, 'offset': 0, 'split': 30, 'minSplit':3});
		test.equal(this.colgen.getSavedValues().color, 30, 'The color should be 30');
		this.colgen.setSavedValues({'color': 40, 'offset': 0, 'split': 30, 'minSplit':3});
		test.equal(this.colgen.getSavedValues().color, 30, 'The color should be 30');
		test.done()
	},

	setSavedValues_colorToLarge_colorWrapsAroundThenSetToClosestMulitiple: function(test) {
		this.colgen.setSavedValues({'color': 340, 'offset': 0, 'split': 30, 'minSplit':3});
		test.equal(this.colgen.getSavedValues().color, 0, 'The color should be 0');
		this.colgen.setSavedValues({'color': 350, 'offset': 0, 'split': 30, 'minSplit':3});
		test.equal(this.colgen.getSavedValues().color, 30, 'The color should be 30');
		test.done()
	},

	setSavedValues_splitToLow_defaultsToColorOffset: function(test) {
		this.colgen.setSavedValues({'color': 30, 'offset': 0, 'split': 2, 'minSplit':3});
		test.equal(this.colgen.getSavedValues().split, 30, 'The split should be 30');
		test.done()
	},

	setSavedValues_splitToHigh_defaultsToColorOffset: function(test) {
		this.colgen.setSavedValues({'color': 0, 'offset': 0, 'split': 31, 'minSplit':3});
		test.equal(this.colgen.getSavedValues().split, 30, 'The split should be 30');
		test.done()
	},

	setMinimumDifference_validNumber_setsValue: function(test) {
		this.colgen.setMinimumDifference(10);
		test.equal(this.colgen.getSavedValues().minSplit, 10, 'The minSplit should be 10');
		test.done()
	},

	setMinimumDifference_minSplitToLow_defaultsToZero: function(test) {
		this.colgen.setMinimumDifference(-1);
		test.equal(this.colgen.getSavedValues().minSplit, 0, 'The minSplit should be 0');
		test.done()
	},

	setMinimumDifference_minSplitToHigh_defaultsToColorOffset: function(test) {
		this.colgen.setMinimumDifference(31);
		test.equal(this.colgen.getSavedValues().minSplit, 30, 'The minSplit should be 0');
		test.done()
	},

};
