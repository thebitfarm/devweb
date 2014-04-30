// require other, dependencies here, ie:
// require('./vendor/moment');



//require('../vendor/jquery');
//require('../vendor/bootstrap');
//require('../vendor/handlebars');
//require('../vendor/ember');
//require('../vendor/ember-data'); // delete if you don't want ember-data

//require('../vendor/ember-addons.bs_for_ember/dist/js/bs-alert.min');
//require('../vendor/ember-addons.bs_for_ember/dist/js/bs-core.min');


var App = Ember.Application.create();
//var App = Ember.Application.createWithMixins(Bootstrap.Register);
//App.RESTAdapter = require('./adapter');
//App.Store = require('./store'); // delete if you don't want ember-data
App.Adapter = require('./adapter');

module.exports = App;

