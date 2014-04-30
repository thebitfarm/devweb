

module.exports = Ep.RestAdapter.extend({
    url: 'http://localhost:3000',
    namespace: '',   //api

/*
    serializer: DS.RESTSerializer.extend({
        primaryKey: function(type) {
            return '_id';
        }
        	If anything pops out as a float, uncomment this to force string
        ,serializeId: function(id) {
            return id.toString();
        }
    })
*/
});

