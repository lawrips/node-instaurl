var should = require('should');

var config = require('../config/instaurl.json');

    var Instaurl = require('@lripsher/instaurl')
    var instaurl = new Instaurl(config);
var key;

var mySecret = 'this is a secret';

describe('Test basic setting / getting with instaurl', function () {
    it('Set a secret', function (done) {
        instaurl.set(mySecret, (err, result) => {
            if (err) console.log(err);
            should.not.exist(err);
            console.log(result);
            key = result.key;
            done();
        })
    });

    it('Get the secret that was set', function (done) {
        instaurl.get(key, (err, result) => {
            if (err) console.log(err);
            should.not.exist(err);
            result.secret.should.equal(mySecret);
            console.log(result);
            done();
        })
    });
})