var orm = require('orm');
var mysql = require('mysql');
var mongodb = require('mongodb');
var settings = require('./settings');
var util = require('util');


console.log( "Port: " + settings["port"] );
//console.log( "Mongodb: %j", settings.database["mongodb"] );

if( false ) {
for ( var x in settings.database) {
	console.log("Checking DB: " + x);

	orm.connect( settings.database[x]["URL"] , function (err, db) {
	    if (err) {
	        console.log("Something is wrong with the connection", err);
	        return;
	    }

	    console.log(" DB: %j: ", db.driver_name);

	    // connected!
	    console.log("Success on");
	    db.close();
	});

};
}

// Check database.js

var database = require('./database');
if( true ) {
database.conn( settings.activedb, function( err, db ) {
	if( err ) {
		console.error("ERROR: " + err );
	}
	console.log("Attempting save");

	db.models.person.create( [{
		firstName: "John",
		lastName: "Doe",
		birthday: new Date()
	}], function( err, items ) {
      if( err ) {
      	console.log( "ERROR: " + err);
      }
	});
});
}

