var request = require('supertest');
var app = require('../server.js');


describe("GET /", function () {
    it("respond with HTML and status 200 OK", function (done) {
        request(app)
            .get("/")
            .expect("Content-type", /html/)
            .expect(200, done)
    });
})
   
describe('GET /messages', function () {
    it('respond with JSON containing a list of all messages', function (done) {
        this.timeout(30000);
        request(app)
            .get('/messages')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /messages', function () {
    let data = {
        "name": "Supertest62289189a322a00956557815fbd3b80d",
        "message": "62289189a322a00956557815fbd3b80d",
    }
    it('respond with 200 OK', function (done) {
        this.timeout(30000);
        request(app)
            .post('/messages')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});