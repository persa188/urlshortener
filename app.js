var crypto = require('crypto'),
  path = require('path'),
  express = require('express'),
  app = express(),
  sanitizer = require('sanitizer'),
  validator = require('express-validator'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  conf = require('./conf'),
  utils = require('./utils/utils.js'),
  randomstring = require("randomstring"),
  stat = utils.statcodes;

//body parser stuff
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));

//static
app.use(express.static(__dirname + '/public/'));

//db conf
mongoose.connect(conf.mlab.mongouri, utils.mongo_options);
mongoose.Promise = global.Promise;

//models
var URL = require('./models/url');

//https setup
var https = require("https");
var fs = require('fs');
var privateKey = fs.readFileSync( 'certs/server.key' );
var certificate = fs.readFileSync( 'certs/server.crt' );
var config = {
        key: privateKey,
        cert: certificate
};

app.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

app.post('/api/shorten/', function(req, res, next) {
  //check if long_url exists
  URL.findOne({long_url: req.body.url}, {}, function(err, doc) {
    if (err) return res.status(500).end(stat._500);
    if (doc) res.send({"short_url": doc.short_url});
    else {
      var new_url = new URL ({
        long_url: req.body.url
      });
      new_url.save(function (err, docs) {
        if (err) res.status(500).end(stat._500);
        res.send(docs.short_url);
      });
    }
  })
});

app.get('/u/:id', function(req, res, next) {
  URL.findOne({short_url: req.params.id}, {}, function (err, doc) {
    if (err) return res.status(500).end(stat._500);
    if (!doc) return res.status(404).end(stat._404);
    //redirect
    res.writeHead(302, {
      'Location': doc.long_url
    });
    res.end();
  });
});

//https server
https.createServer(config, app).listen(3000, function () {
    console.log('HTTPS on port 3000');
});
