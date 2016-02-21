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
        "limitCount": 1
    },
    "201": {
        "limitCount": 3
    },
    "limitInterval": 10000
};



describe('Exceed the rate limit for this developer token', function () {
    // by default, 
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
});