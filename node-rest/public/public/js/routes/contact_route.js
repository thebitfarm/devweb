var ContactRoute = Ember.Route.extend({
	model: function() {
		console.log("Loading Store...");

		var myuser = new App.Person({
			firstName: 'd2h',
			lastName: 'd2h',
			birthdate: new Date('01-20-1984')
			});
		var myuser2 = this.session.create(App.Person, {
			firstName: 'd2h',
			lastName: 'd2h',
			birthdate: new Date('01-20-1984')
			});
		this.session.flush();
		console.log("Created user: " + myuser2.id);

/*
		for( var x = 0; x < posts2.length; ++x ) {
			var mypost = posts2[x];
			console.log( "Date: " + mypost.date);
			var post = this.store.createRecord('post', {
				title: mypost.title,
				date: new Date(mypost.date),
				excerpt: mypost.excerpt,
				body: mypost.body
			});

			this.store.find('person', myuser.id).then(function(user) {
			  post.set('author', user);
			});
		}
		*/

	}
});

module.exports = ContactRoute;

