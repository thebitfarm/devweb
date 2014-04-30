Ember.Handlebars.helper('format-markdown', function(value, option) {
	var showdownConverter = new Showdown.converter({});
	return new Handlebars.SafeString(showdownConverter.makeHtml(value));
});

