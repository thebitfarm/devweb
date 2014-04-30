App.Post       = Ep.Model.extend();

/* Ember-Data Model
var Person = DS.Model.extend({
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	birthdate: DS.attr('date'),
	posts: DS.hasMany('post'),

	fullName: function() {
		return this.get('firstName') + ' ' + this.get('lastName');
	}.property('firstName', 'lastName')
});
*/

var Person = Ep.Model.extend({
	firstName: Ep.attr('string'),
	lastName: Ep.attr('string'),
	birthdate: Ep.attr('date'),
	posts: Ep.hasMany( 'post' )

});

module.exports = Person;

