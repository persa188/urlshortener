var username = 'app';
var password = 'app';

var mlab = {
  mongouri: "mongodb://" + username + ":" + password + "@ds161630.mlab.com:61630/urlshortener"
};

module.exports = {mlab};
