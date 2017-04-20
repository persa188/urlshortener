var username = 'app';
var password = 'app';
//this is an example db, change to your own for production use
var mlab = {
  mongouri: "mongodb://" + username + ":" + password + "@ds111771.mlab.com:11771/urlshortener-example"
};

module.exports = {mlab};
