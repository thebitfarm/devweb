#!/bin/bash


# Person create
curl -X POST -H "Content-Type: application/json" -d '{"lastName":"xyz-last","firstName":"xyz-first"}' http://localhost:3000/api/people


# Person create from Ember
curl -X POST -H "Content-Type: application/json" -d '{"person":{"firstName":"d2h","lastName":"d2h","birthdate":"Fri, 20 Jan 1984 06:00:00 GMT"}}' http://localhost:3000/api/people

curl -X POST -H "Content-Type: application/vnd.api+json" -d '{"person":[{"firstName":"d2h","lastName":"d2h","birthdate":"Fri, 20 Jan 1984 06:00:00 GMT"}]}' http://localhost:3000/api/people

# Person get
curl -is http://localhost:3000/people/5330ee570fed81e908000001

# Person list
curl -is http://localhost:3000/api/people

# Person Patch
curl -X PATCH -H "Content-Type: application/vnd.api+json" -d '{ "op": "replace", "path": "/people/0/lastName", "value": "test-blahLast-BLAHBLAH2" }' http://localhost:3000/people/533f0cfe366dc1d40a000002
	
# Person Put
curl -X PUT -H "Content-Type: application/vnd.api+json" -d '{"people":[{"lastName": "test-blahLast-BLAHBLAH"}]}' http://localhost:3000/people/533f0cfe366dc1d40a000002

