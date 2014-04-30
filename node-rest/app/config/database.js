var settings = require('../../app/config/settings');
var orm = require('orm');
//var BSON = require('BSON');

var connections = {};

function setup( db, cb ) {

	require('../models/post')( orm, db );
	require('../models/person')( orm, db );

	return ;
}


module.exports = {
	conn: function( database, cb ) {
		if( connections[database] ) {
			return cb(null, connections[database]);
		}
		if( !settings.database[ database ] ) {
			console.error("Database: " + database + ", not in settings");
			throw new Error("Database: " + database + ", not in settings");
		}

		console.log("Attempting connection to: " + database );
		orm.connect( settings.database[ database ]["URL"], function( err, db ) {
				if( err ) {
					console.error("Error connecting to : " + database);
					return cb( err );
				}


				connections[database] = db;
				setup( db, cb );
				cb( null, db );
		});
	}

}
