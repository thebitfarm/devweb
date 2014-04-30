var fortune = require('fortune');
var settings = require('./app-fortune/config/settings');
var express = require('express');

console.log("Path: " + settings.path);

var options = settings["database"][ settings.activedb ];
//options["namespace"] = "res";
//options["baseUrl"] = "api";

console.log("Options: %j", options);

var app = fortune(options);

// Person Model
app.resource('person', {
	firstName: String,
	lastName: String,
	birthdate: Date
})

// Post Model
.resource('post', {
	title: String,
	excerpt: String,
	body: String,
	date: Date,
	author: {ref: 'person', inverse: 'posts'}
});

console.log("%j", app.router.routes)

app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});
app.use(express.static(settings.path + '/public'));


app.listen( settings.port );
