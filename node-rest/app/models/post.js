var moment = require('moment');


module.exports = function (orm, db) {
  var Post = db.define('post', {
    title     : { type: 'text', required: true },
    excerpt     : { type: 'text', required: false },
    body      : { type: 'text', required: true,  big:  true },
    date : { type: 'date', required: true, time: true }
  },
  {
    hooks: {
      beforeValidation: function () {
        this.date = new Date();
      }
    },
    validations: {
      title: [
        orm.enforce.ranges.length(1, undefined, "must be atleast 1 letter long"),
        orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
      ],
      body: [
        orm.enforce.ranges.length(1, undefined, "must be atleast 1 letter long"),
        orm.enforce.ranges.length(undefined, 32768, "cannot be longer than 32768 letters")
      ]
    },
    methods: {
      serialize: function () {
        var authorStr;

        if (this.comments) {
          authorStr = this.author.fullName;
        } else {
          authorStr = "";
        }

        return {
          id        : this.id,
          title     : this.title,
          author 	: authorStr,
          excerpt	: this.excerpt,
          body      : this.body,
          date 		: moment(this.date).fromNow()
        };
      }
    }
  });

Post.hasOne('person', db.models.person, { required: false, reverse: 'posts', autoFetch: true });

};
