var get = Ember.get, set = Ember.set;

Ep.Model.reopenClass({
  attributes: Ember.computed(function() {
    var map = Ember.Map.create();

    this.eachComputedProperty(function(name, meta) {
      if (meta.isAttribute) {
        Ember.assert("You may not set `id` as an attribute on your model. Please remove any lines that look like: `id: Ep.attr('<type>')` from " + this.toString(), name !== 'id');

        meta.name = name;
        map.set(name, meta);
      }
    });

    return map;
  })
});

Ep.Model.reopen({
  eachAttribute: function(callback, binding) {
    get(this.constructor, 'attributes').forEach(function(name, meta) {
      callback.call(binding, name, meta);
    }, binding);
  },

  attributeWillChange: Ember.beforeObserver(function(record, key) {
    var session = get(this, 'session');
    if(!session) return;
    session.modelWillBecomeDirty(this);
  }),

  // attributeDidChange: Ember.observer(function(record, key) {
  //   record.send('didSetProperty', { name: key });
  // })
});

Ep.attr = function(type, options) {
  options = options || {};

  var meta = {
    type: type,
    isAttribute: true,
    options: options
  };

  return Ember.computed(function(key, value, oldValue) {
    if (arguments.length > 1) {
      Ember.assert("You may not set `id` as an attribute on your model. Please remove any lines that look like: `id: Ep.attr('<type>')` from " + this.constructor.toString(), key !== 'id');
    }

    return value;
  }).meta(meta);
};