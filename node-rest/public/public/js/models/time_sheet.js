
/* Ember-Data Model
var TimeSheet = DS.Model.extend({

  description: DS.attr('string'),

  minutes: DS.attr('number')

});
*/

var TimeSheet = Ep.Model.extend({
	description: Ep.attr('string'),
	minutes: Ep.attr('number')

});


module.exports = TimeSheet;

