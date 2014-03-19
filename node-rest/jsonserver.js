#!/usr/bin/node

var http = require('http');
//var JSON = require('JSON');
var url = require('url');

var port = 3000;
if( process.argv.length > 2 ) {
	port = Number(process.argv[2]);
}

/**
		Function Definitions
*/
function parseTimeISO( mydateObj ) {
	if( mydateObj['iso'] == null ) 
		return console.error("Could not access mydateObj['iso']");

	var mydate = new Date( mydateObj['iso'] );


	var retObj = {};
	retObj['hour'] = mydate.getHours();
	retObj['minute'] = mydate.getMinutes();
	retObj['second'] = mydate.getSeconds();
	console.log('Result: ' + JSON.stringify( retObj ));
	return JSON.stringify( retObj );
}

function parseTimeUnix( mydateObj ) {

	var mydate = new Date( mydateObj['iso'] );
	var retObj = {};
	retObj['unixtime'] = mydate.getTime();
	console.log('Result: ' + JSON.stringify( retObj ));
	return JSON.stringify( retObj );
}


var server = http.createServer( function(req, res) {

	var urlobj = url.parse(req.url, true);
	var currDate = new Date().getTime();
	console.log("Currdate: " + currDate);

	switch( urlobj.pathname ) {
		case "/api/parsetime":
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end( parseTimeISO( urlobj.query ) );
			break;

		case "/api/unixtime":
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end( parseTimeUnix( urlobj.query ) );
			break;

		default:
			res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
			res.end("Method not supported");
			break;
	}


});
server.listen(port);
console.log("Listing on HTTP localhost:"+port+"... ");



