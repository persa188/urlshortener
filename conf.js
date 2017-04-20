var username = process.env.mongo_username;
var password = process.env.mongo_password;
var uri = process.env.mongo_uri;
//this is an example db, change to your own for production use
var mlab = {
  mongouri: "mongodb://" + username + ":" + password + mongo_uri
};

module.exports = {mlab};
