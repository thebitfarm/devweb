// Globals
var showdownConverter = new Showdown.converter({});

// Ember Application
App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Router.map(function() {
  // put your routes here
  this.resource('about');
  this.resource('contact');
  this.resource('posts', function() {
  	this.resource('post', { path: ':post_id' });
  });
  
});


App.PostsRoute = Ember.Route.extend({
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
		return this.store.all('post'); // 'all' will use cache
	}
});

// For directly accessing #/posts/2
App.PostRoute = Ember.Route.extend({
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
		return this.store.find('post', params.post_id);
	}
});

App.ContactRoute = Ember.Route.extend({
	model: function() {
		console.log("Loading Store...");

		var myuser = this.store.createRecord('person', {
			firstName: 'd2h',
			lastName: 'd2h',
			date: new Date('01-20-1984')
		});
		for( var x = 0; x < posts2.length; ++x ) {
			var mypost = posts2[x];
			this.store.createRecord('post', {
				title: mypost.title,
				author: myuser,
				date: mypost.date,
				excerpt: mypost.excerpt,
				body: mypost.body
			});
		}

	}
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},

		doneEditing: function() {
			this.set('isEditing', false);
		}
	}
});

Ember.Handlebars.helper('format-date', function(date) {
	return moment(date).fromNow();
});

Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdownConverter.makeHtml(input));
})


// Ember Store Adapter
App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'data'
});

// Ember Model
App.Post = DS.Model.extend({
	title: DS.attr('string'),
	author: DS.belongsTo('person'),
	date: DS.attr('date', { defaultValue: function() { return new Date(); } } ),
	excerpt: DS.attr('string'),
	body: DS.attr('string')
});

App.Person = DS.Model.extend({
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	birthday: DS.attr('date'),

	fullName: function() {
		return this.get('firstName') + ' ' + this.get('lastName');
	}.property('firstName', 'lastName')
});

// Ember fixture
var posts2 = [{
	id: '1',
	title: "Rails is Omakase",
	author: { name: "d2h" },
	date: new Date('12-27-2012'),
	excerpt: "Lots of stuff here.",
	body: "I want this for my ORM, I want that fo my bros"
}, {
	id: '2',
	title: "The Parley Letter",
	author: { name: "d2h" },
	date: new Date('12-08-2013'),
	excerpt: "Parley my self yo",
	body: "A long list of topics were raised and I took a little time to belittle my late friend.\n## Blah\n**some stuff**"
}];


