var database = require('../config/database');
var settings = require('../config/settings');

module.exports = {
	create: function( req, res, next ) {
		console.log("Create on Person");

		database.conn( settings.activedb, function( err, db ) {
			next.ifError(err);
			var paramPerson = req.params.person || req.params;
	

			var firstName = paramPerson.firstName;
			var lastName = paramPerson.lastName;
			console.log("Inside create %s %s", firstName, lastName);

			db.models.person.create( [{
				firstName: firstName,
				lastName: lastName,
				birthdate: new Date()
			}], function( err, person ) {
		      if(err) {
		        if(Array.isArray(err)) {
		          return res.send(200, { errors: helpers.formatErrors(err) });
		        } else {
		          return next(err);
		        }
		      }

			  var result = ( person && person.length == 1 ) ? person[0] : person;
			  result = { person: result };
	    	  res.send(200, result );
		      return next();
			});
		});

	}, // END - create

	list: function( req, res, next ) {
		console.log("List on Person");

		database.conn( settings.activedb, function( err, db ) {
			next.ifError(err);

		    db.models.person.find().limit(20).order('-id').all(function (err, persons) {
		      next.ifError(err);

		      //var items = persons.map(function (p) {
		      //  return p.serialize();
		      //});

		      res.send( persons );
		      return next();
		    });
	    })

	}, // END - list
	
	get: function( req, res, next ) {
		var id = req.params.id;
		console.log("Get on Person: " + id);


		database.conn( settings.activedb, function( err, db ) {
			next.ifError(err);

			//database.formatId( db, id )
			db.models.person.get( id, function( err, person ) { 
				next.ifError(err);

				var result = ( person && person.length == 1 ) ? person[0] : person;
				console.log("Result: %j", result);
				res.send( result );
				return next();
			});

		});

	}, // END - get

	update: function( req, res, next ) {
		var id = req.params.id;
		var persObj = req.body;
		console.log("Update on Person: " + id);
		console.log("       person: %s", persObj);

		database.conn( settings.activedb, function (err, db) {
			next.ifError(err);

			db.models.person.get( id, function (err, person) {
				next.ifError(err);
				person.save( persObj, function (err) {
					next.ifError(err);
					res.send(200, persObj);
					next();
				});

			});
		});

	}, // END - update

	delete: function( req, res, next ) {
		var id = req.params.id;
		console.log("Delete on Person: " + id);

		database.conn( settings.activedb, function (err, db) {
			next.ifError(err);

			db.models.person.get( id, function (err, person) {
				next.ifError(err);
				person.remove(function (err) {
					res.send(204); // 204 means no entity
					return next();
				});
			});

		});

	}, // END - delete

	find: function( req, res, next ) {
		console.log("Find on Persons");
	}

};
