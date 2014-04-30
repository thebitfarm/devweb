var PostRoute = Ember.Route.extend({
	/* XHR
	model: function(params) {
		return $.getJSON('/data/posts.json').then(function(data) {
			//console.log("data is: " + data);
			return data.posts.findBy('id', params.post_id);
		});
	}
	*/
	/* Simple model 
	model: function(params) {
		return posts2.findBy('id', params.post_id);
	}
	*/
	/* Store model */
	model: function(params) {
		console.log("Finding Post["+params.post_id+"] ...");
		//return this.store.find('post', params.post_id);
	}
});

module.exports = PostRoute;

