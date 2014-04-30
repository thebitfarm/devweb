Ember.Handlebars.helper('format-date', function(value, option) {
	return moment(value).fromNow();
});

