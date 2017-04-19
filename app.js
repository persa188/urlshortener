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
  stat = utils.statcodes,
  urlv = require('valid-url');

//body parser stuff
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));

//static
app.use(express.static(__dirname + '/public/'));

//db conf
mongoose.connect(conf.mlab.mongouri, utils.mongo_options);
mongoose.Promise = global.Promise;

//for tests
exports.app = app;

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

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect, @TODO: edit this in a production env
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

app.get('/', function(req, res, next) {
  res.sendFile('/public/index.html');
});

app.post('/api/shorten/', function(req, res, next) {
  //set header
  res.setHeader('Content-Type', 'application/json');
  //check if long_url exists
  sanitizer.sanitize(req.body.url);
  if (!req.body.url || !urlv.isUri(req.body.url)) res.status(400).end(stat._400);
  URL.findOne({long_url: req.body.url}, {}, function(err, doc) {
    if (err) return res.status(500).end(stat._500);
    if (doc) res.status(200).end(JSON.stringify({"short_url": doc.short_url}));
    else {
      //add to db and return
      var new_url = new URL ({
        long_url: req.body.url
      });
      new_url.save(function (err, docs) {
        if (err) res.status(500).end(stat._500);
        return res.send({"short_url": JSON.stringify(docs.short_url)});
      });
    }
  });
});

app.use(function (req, res, next){
    //for debugging only
    console.log("HTTP request", req.method, req.url, req.body);
    return next();
});

app.get('/u/:id', function(req, res, next) {
  sanitizer.sanitize(req.params.id);
  if(!req.params.id) return res.status(400).end(stat._400);

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
https.createServer(config, app).listen(7070, function () {
    console.log('HTTPS on port 7070');
});
