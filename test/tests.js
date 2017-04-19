var url = require('../models/url'),
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
        agent.post('/api/shorten/').type('json').send(vars.testurl1)
          .end(function (err, res) {
            res.should.have.status(200);
            done();
          });
      });

      it('adding an empty url should return bad request', (done) => {
        agent.post('/api/shorten/').type('json').send(vars.testurl_empty)
          .end(function (err, res) {
            res.should.have.status(400);
            done();
          });
      });

      it('adding a url without http:// should return bad request', (done) => {
        agent.post('/api/shorten/').type('json').send(vars.testurl_bad_formatting)
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

    it('should return code 302 when redirecting to google', function(done) {
      agent
        .get('/u/'+vars.google_id)
        .expect(302)
        .end(function(err, res){
          if(err) {
            done(err);
          } else {
            done();
          }
        });
    });
  });
});
