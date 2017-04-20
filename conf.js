var username = process.env.MONGO_USERNAME_URLSHORTENER;
var password = process.env.MONGO_PASSWORD_URLSHORTENER;
var uri = process.env.MONGO_URI_URLSHORTENER;
//this is an example db, change to your own for production use
var mlab = {
  mongouri: "mongodb://" + username + ":" + password + "@" + uri
};

module.exports = {mlab};
