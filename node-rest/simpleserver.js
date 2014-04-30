var restify = require('restify');
var fs = require('fs');
var bunyan = require('bunyan');
var settings = require('./app/config/settings');
var routes = require('./app/config/routes');
/*
Simple Server
test command
curl --cacert server-cert.pem https://dev.thebitfarm.org:3000/echo/doh
*/

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0',
  //certificate: fs.readFileSync('server-cert.pem').toString(),
  //key: fs.readFileSync('server-key.pem').toString()
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Logging
server.on('after', restify.auditLogger({
  log: bunyan.createLogger({
    name: 'audit',
    stream: process.stdout
  })
}));

// Load in REST API routes
routes( server );

// Sample
server.get('/data/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

// Static app
server.get(/\/.*/, restify.serveStatic({
  directory: './public',
  default: 'index.html'
}));


server.listen(settings.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});

