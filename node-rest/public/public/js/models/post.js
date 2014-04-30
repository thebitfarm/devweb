App.Person       = Ep.Model.extend();


/* Ember-Data Model
var Post = DS.Model.extend({
	title: DS.attr('string'),
	author: DS.belongsTo('person'),
	date: DS.attr('date', { defaultValue: function() { return new Date(); } } ),
	excerpt: DS.attr('string'),
	body: DS.attr('string')
});
*/

var Post = Ep.Model.extend({
	title: Ep.attr('string'),
	author: Ep.belongsTo( 'person' ),
	date: Ep.attr('date'),
	excerpt: Ep.attr('string'),
	body: Ep.attr('string')

});

module.exports = Post;

