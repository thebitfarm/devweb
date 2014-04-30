var moment = require('moment');

module.exports = function (orm, db) {
  var Person = db.define('person', {
    firstName     : { type: 'text', required: true },
    lastName      : { type: 'text', required: true,  big:  false },
    birthdate     : { type: 'date', required: true, time: true }
  },
  {
    hooks: {
      beforeValidation: function () {
        this.birthdate = new Date();
      }
    },
    validations: {
      firstName: [
        orm.enforce.ranges.length(1, undefined, "must be atleast 1 letter long"),
        orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
      ],
      lastName: [
        orm.enforce.ranges.length(1, undefined, "must be atleast 1 letter long"),
        orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
      ]
    },
    methods: {
      serialize: function () {

        return {
          id        	: this.id,
          firstName     : this.firstName,
          lastName      : this.lastName,
          createdAt 	: moment(this.birthdate).fromNow()
        };
      },
      fullName: function() {
      	return this.firstName + " " + this.lastName;
      }
    }
  });
};
