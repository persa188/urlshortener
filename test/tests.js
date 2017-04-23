var url = require('../models/URL'),
  vars = require("./testvars.js"),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('../app').app,
  should = chai.should(),
  request = require('supertest'),
  agent = request(server);

chai.use(chaiHttp);

/* Our parent block */
describe('URL API Tests', () => {
  describe('/POST /api/shorten', () => {
      /* before each test */
      before((done) => {
        done();
      });

      it('adding a properly formatted url should work', (done) => {
        agent.post('/api/shorten/').type('json').send(vars.testURL1)
          .end(function (err, res) {
            res.should.have.status(200);
            done();
          });
      });

      it('adding an empty url should return bad request', (done) => {
        agent.post('/api/shorten/').type('json').send(vars.testURLEmpty)
          .end(function (err, res) {
            res.should.have.status(400);
            done();
          });
      });

      it('adding a url without http:// should return bad request', (done) => {
        agent.post('/api/shorten/').type('json').send(vars.testURLBadFormatting)
          .end(function (err, res) {
            res.should.have.status(400);
            done();
          });
      });

  }); // end descr (/POST /api/shorten)
}); // end outer (URL API TESTS)

describe('URL API Tests', () => {
  describe('/GET /u/:id', () => {
    /* before each test */
    before((done) => {
      done();
    });

    //this test will fail on your own db, you must update the teststub value vars.google_id for it to work!
    it('should return code 302 when redirecting to google', function(done) {
      agent
        .get('/u/'+vars.googleID) //the id is a value I took from our db
        .expect(302)              //using the before tag was buggy and test stubs
        .end(function(err, res){   //are better anyways
          if(err) {
            done(err);
          } else {
            done();
          }
        });
    }); //end it

    it('should return code 404 when redirecting to unkown short url', function(done) {
      agent
        .get('/u/'+vars.randomID) //the id is a value I took from our db
        .expect(404)              //using the before tag was buggy and test stubs
        .end(function(err, res){   //are better anyways
          if(err) {
            done(err);
          } else {
            done();
          }
        });
    }); //end it
  });
});
