// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');

// create a schema
var url_schema = new Schema({
  short_url: { type: String, required: false, unique: true },
  long_url: { type: String, required: true, unique: true }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// create a schema
var url_schema_custom = new Schema({
  short_url: { type: String, required: true, unique: true },
  long_url: { type: String, required: true, unique: true }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

url_schema.pre('save', true, function(next, done) {
  // calling next kicks off the next middleware in parallel
  var self = this;
  self.constructor.find({}, {}, function(err, doc) {
    var rand = shortid.generate();
    if (doc) {
      var ids = doc.map (function (x) {
        return x.short_url;
      });
      while (ids.indexOf(rand) > -1) {
        rand = shortid.generate;
      }
    }
    self.short_url = rand;
    done();
  });
  next();
});

url_schema_custom.pre('save', true, function(next, done) {
  // calling next kicks off the next middleware in parallel
  var self = this;
  self.constructor.find({}, {}, function(err, doc) {
    console.log(this, self);
    done();
  });
  next();
});

// the schema is useless so far
// we need to create a model using it
var url = mongoose.model('url', url_schema);
var url_custom = mongoose.model('url_custom', url_schema_custom);

// make this available to our users in our Node applications
module.exports = { url, url_custom };
