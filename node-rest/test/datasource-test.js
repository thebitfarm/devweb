var vows = require('vows'),
    assert = require('assert');


var database = require('../app/config/database');


vows.describe('Database connection check').addBatch({
	'Check mongodb': {
		topic: function() { 
			database( "mongodb", this.callback);
		},
		'can be accessed': function( err, db ) {
			assert.isNull(err);
			assert.isObject(db);
		}

	},
	'Check mysql': {
		topic: function() {
			database( "mysql", this.callback);
		},
		'can be accessed': function( err, db ) {
			assert.isNull(err);
			assert.isObject(db);
		}
	}


}).export(module);
