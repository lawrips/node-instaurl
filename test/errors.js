var should = require('should'),
    async = require('async');

var config = require('../config/instaurl.json');

var Instaurl = require('../lib/index.js')
var instaurl = new Instaurl(config);
var key;

var mySecret = 'this is a secret';

// by default these are the rate limits for a developer token
var rateLimit = {
    "*": {
        "limitCount": 10
    },
    "404": {
        "limitCount": 3
    },
    "201": {
        "limitCount": 3
    },
    "limitInterval": 10000
};



describe('Check all error codes', function () {
    
    it('Request the SDK without a token - confirm 401', function(done) {
        var badInstaurl = new Instaurl({'token': 'badtoken'});
        badInstaurl.get('randomstring', (err, result) => {
            should.exist(err);
            err.statusCode.should.be.equal(401);
            done();
        });
    });

    it('Get an unknown instaurl - confirm 404', function (done) {
        instaurl.get('randomstring', (err, result) => {
            should.exist(err);
            err.statusCode.should.be.equal(404);
            done();
        });
    });

    it('Set a # of secrets that exceeds the threshold', function (done) {
        async.timesSeries(rateLimit['201'].limitCount + 1, (n, next) => {
            instaurl.set(mySecret, (err, result) => {
                if (err) console.log(err);
                if (n < rateLimit['201'].limitCount) {
                    console.log(n + ': no error');
                    should.not.exist(err);
                }
                else {
                    console.log(n + ': error');
                    should.exist(err);
                }
                return next();
            })
        }, (err, results) => {
            console.log('done');
            done();
        });
    });

    it('Wait a period of time and then send again', function (done) {
        setTimeout(() => {
            instaurl.set(mySecret, (err, result) => {
                if (err) console.log(err);
                should.not.exist(err);
                done();
            });
        }, rateLimit.limitInterval);
    });
    
        
    it('Get an instaurl twice - confirm expired 410', function (done) {
        // set the instaurl
        instaurl.set(mySecret, (err, result) => {
            if (err) console.log(err);
            should.not.exist(err);
            
            // get the instaurl - should be fine
            instaurl.get(result.key, (err, result) => {
                if (err) console.log(err);
                should.not.exist(err);
                result.secret.should.equal(mySecret);
                
                // get the instaurl - should be expired
                instaurl.get(result.key, (err, result) => {
                    should.exist(err);
                    err.statusCode.should.be.equal(410);
                    should.not.exist(result.secret);
                });
                done();
            })
        });        
    });
});