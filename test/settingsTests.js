module.exports = {
	setUp: function(callback) {
		this.colgen = require('../index');
		callback();
	},

	getSavedValues_callBeforeGeneration_returnsInitialSettings: function(test) {
		var initial = this.colgen.getSavedValues()
		test.deepEqual(this.colgen.getSavedValues(), 
			{'color': 0, 'offset': 0, 'split': 30, 'minSplit':3}, 
			'The saved specs should be an object with the inital settings');
		test.done();
	},

	setSavedValues_newSettingsProvided_updatesSettings: function(test) {
		var initial = this.colgen.getSavedValues();
		this.colgen.setSavedValues({'color': 30, 'offset': 0, 'split': 30, 'minSplit':3});
		test.notDeepEqual(this.colgen.getSavedValues(), initial, 
			'The initial settings and current settings should be different');
		test.done();
	}

}
