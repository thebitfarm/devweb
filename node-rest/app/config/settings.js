
var path       = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : process.env.NODE_PORT || 3000,
  activedb   : "mongodb",
  database   : {
  	mongodb      : {
	    URL	     : "mongodb://dev:earthD3v@localhost:27017/devdb?debug=true",
	    protocol : "mongodb", // or "mysql", or "postgresql"
	    query    : { pool: true },
	    host     : "localhost",
	    port     : "27017",
	    database : "devdb",
	    user     : "dev",
	    password : "earthD3v"
	},
	mysql 		 : {
		URL		 : "mysql://dev:earthd3v@localhost:3306/devdb?pool=true",
	    protocol : "mysql", // or "mysql", or "postgresql"
	    //query    : { pool: true },
	    host     : "127.0.0.1",
	    port     : "3306",
	    database : "devdb",
	    user     : "dev",
	    password : "earthd3v"
	}
  }
};

module.exports = settings;