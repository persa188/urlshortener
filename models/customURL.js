// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var urlSchemaCustom = new Schema({
  short_url: { type: String, required: true, unique: true },
  long_url: { type: String, required: true}
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

var customURL = mongoose.model("url_custom", urlSchemaCustom);

module.exports = { customURL }
