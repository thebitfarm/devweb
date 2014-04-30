var APIeasy = require('api-easy'),
	assert = require('assert'),
	crypto = require('crypto'),
	test_util = require('./test-util'),
	settings = require('../../app/config/settings');


var prefix = "/api";
var suite = APIeasy.describe('/posts');
var testId = crypto.randomBytes(Math.ceil(6/2))
		.toString('hex') // convert to hex
		.slice(0,6);

var testObj = { "posts": [{
	title: "MyTitle",
	excerpt: "MyExcerpt",
	body: "MyBody",
	author: "5330ee570fed81e908000001"
}]};

var replacements = new Object;

// Add a suite.before tokenReplace function
test_util.addReplacementTokens( suite, replacements );

suite.discuss('/posts')
	.discuss('and Post['+ testId +']')
	.use('localhost', settings.port)
	.setHeader('Content-Type', 'application/vnd.api+json')
	.post('/posts', testObj)
		.expect(201)
		.expect('should respond with creation object', function (err, res, body) {
			var result = JSON.parse(body);
			//console.log("Result: %j", result);
			var id = result._id || result.id || result.posts[0].id;
			assert.isNotNull(id);

			replacements["id"] = id;
		})
	.next()
	.get('/posts/$id')
		.expect(200)
		.expect('should respond with created object', function (err, res, body) {
			var result = JSON.parse(body);

			assert.isNotNull( result.title );
			assert.equal( result.title, testObj.title );
		})
	.next()
	.put('/posts/$id', { "posts": [{ excerpt: "MyExcerpt-BLAH"+testId}]})
		.expect(200)
		.expect('should respond with updated object', function (err, res, body) {
			var result = JSON.parse(body);
			var excerpt = result.excerpt || result.posts[0].excerpt;

			assert.isNotNull( excerpt );
			assert.equal( excerpt, "MyExcerpt-BLAH"+testId );
		})
	.next()
	.setHeader('Content-Type', 'application/vnd.api+json')
	.del('/posts/$id')
		.expect(204)
	.next()
	.get('/posts/$id')
		.expect(404)
		.expect('should not have a result object', function (err, res, body) {
			var result = JSON.parse(body);

			var resultErr = result.error;
			assert.isNotNull( resultErr );
			assert.equal( "Resource not found.", resultErr);

		})
.export(module);



