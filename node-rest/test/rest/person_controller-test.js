var APIeasy = require('api-easy'),
	assert	= require('assert'),
	crypto	= require('crypto'),
	test_util = require('./test-util'),
	settings = require('../../app/config/settings');

var prefix = "/api";
var suite = APIeasy.describe('/people');
var testId = crypto.randomBytes(Math.ceil(6/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,6);

var testObj = { "people": [{
	firstName: 	'test-xyzFirst-' + testId,
	lastName: 	'test-xyzLast-' + testId
	}]
}

var replacements = new Object;

// Add a suite.before tokenReplace function
test_util.addReplacementTokens( suite, replacements );

suite.discuss('/people')
	.discuss('and Person['+ testId +']')
	.use('localhost', settings.port)
	.setHeader('Content-Type', 'application/vnd.api+json')
	.post('/people', testObj)
		.expect(201)
		.expect('should respond with creation object', function (err, res, body) {
			var result = JSON.parse(body);
			//console.log("Result: %j", result);
			var id = result._id || result.id || result.people[0].id;
			assert.isNotNull(id);

			//console.log("ID: " + id);

	   		replacements["id"] = id;
		})
	.next()
	.get('/people/$id')
		.expect(200)
		.expect('should respond with created object', function (err, res, body) {
			var result = JSON.parse(body);
			//console.log( "Result: %j", result);
			assert.isNotNull( result.firstName );
			assert.equal( result.firstName, testObj.firstName );
		})
	.next()
	/*
	.setHeader('Content-Type', 'application/json-patch+json')
	.patch('/people/$id', { "op": "replace", "path": "/people/0/lastName", "value": "test-blahLast-"+testId })
	*/
	.put('/people/$id', { "people": [{ lastName: "test-blahLast-"+testId }] } )
		.expect(200)
		.expect('should respond with updated object', function (err, res, body) {
			var result = JSON.parse(body);
			var lastname = result.lastName || result.people[0].lastName;
			//console.log( "Result: %j", result);
			assert.isNotNull( lastname );
			assert.equal( lastname, "test-blahLast-"+testId );
		})
	.next()
	.setHeader('Content-Type', 'application/vnd.api+json')
	.del('/people/$id')
		.expect(204)
		// no entity returned
	.next()
	.get('/people/$id')
		.expect(404)
		.expect('should not have a result object', function (err, res, body) {
			var result = JSON.parse(body);
			//console.log("Result: %j", result);
			var resultErr = result.error;
			assert.isNotNull( resultErr );
			assert.equal( "Resource not found.", resultErr );

		})
.export(module);
