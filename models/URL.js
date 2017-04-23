// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var shortid = require("shortid");

// create a schema
var urlSchema = new Schema({
  short_url: { type: String, required: false, unique: true },
  long_url: { type: String, required: true, unique: true }
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

urlSchema.pre("save", true, function(next, done) {
  // calling next kicks off the next middleware in parallel
  var self = this;
  self.constructor.find({}, {}, function(err, doc) {
    if (err) console.log(err);

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


// the schema is useless so far
// we need to create a model using it
var url = mongoose.model("url", urlSchema);

// make this available to our users in our Node applications
module.exports = { url };
