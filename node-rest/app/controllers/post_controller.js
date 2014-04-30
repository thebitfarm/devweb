var database = require('../config/database');
var settings = require('../config/settings');

module.exports = {

    create: function (req, res, next) {
        console.log("Create on Post");

        database.conn( settings.activedb, function (err, db) {
        	next.ifError(err);

        	var title = req.params.title;
        	var excerpt = req.params.excerpt;
        	var body = req.params.body;
        	var date = req.params.date;
        	var author = req.params.author;

        	console.log( "Author: %j", author);

        	db.models.post.create( [{
        		title: req.params.title,
        		excerpt: req.params.excerpt,
        		body: req.params.body,
        		date: req.params.date,
        		author: req.params.author.id
        	}], function (err, post) {
        		if(err) {
        			if(Array.isArray(err)) {
        				return res.send(200, err );
        			} else {
        				return next(err);
        			}
        		}


        		var result = ( post && post.length == 1 ) ? post[0] : post;
        		res.send(200, result);
        		return next();
        	});
        });

    }, // END - create

    list: function (req, res, next) {
    	console.log("List on Post");

    }, // END - list

    get: function (req, res, next) {


    }, // END - get

    update: function (req, res, next) {


    }, // END - update

    delete: function (req, res, next) {


    }, // END - delete

    find: function (req, res, next) {


    } // END - find

};