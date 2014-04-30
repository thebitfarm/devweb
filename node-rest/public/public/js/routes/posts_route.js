var PostsRoute = Ember.Route.extend({
	/* XHR
	model: function() {
		console.log("here");
		return $.getJSON('/data/posts.json').then(function(data) {
			//console.log("data is: " + data);
			return data.posts;
		});
	}
	*/
	/* Simple model 
	model: function() {
		return posts2;
	}
	*/
	/* Store model */
	model: function() {
		console.log("Finding all posts...");
		//return this.store.all('post'); // 'all' will use cache
	}
	
});

module.exports = PostsRoute;

