let expect = require('chai').expect;
let request = require('request');

describe('Status and content', function () {
    describe('Search results', function () {
        it('status', function (done) {
            request('http://localhost:3001/music/jack+johnson/all', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});