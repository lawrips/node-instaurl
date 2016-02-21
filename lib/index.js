'use strict'

var http = require('request');
var baseUrl = 'https://www.instaurl.com/v1.0/';
var getUrl = baseUrl + 'url/';
var postUrl = baseUrl + 'url';


class Instaurl {
    constructor(options) {
        this.token = options.token;
    }

    set(secret, callback) {
        var options = {
            url: postUrl,
            headers: {
                'token': this.token
            },
            json: {secret: secret}
        };
        http.post(options, (err, httpResponse, body) => {
            // todo: handle ERR
            if (err) {
                // all other error case (unauthorized, etc)
                return callback(err);
            }

            if (httpResponse.statusCode == 201) {
                // things are good - show the secret
                return callback(null, body)
            }
            else {
                // all other error case (unauthorized, etc)
                return callback({ 'error': { 'message': body, statusCode: httpResponse.statusCode } });
            }
        });
    }


    get(key, callback) {
        var options = {
            url: getUrl + key,
            headers: {
                'User-Agent': 'node-instaurl',
                'token': this.token
            }
        };

        http.get(options, (err, httpResponse, body) => {
            // todo: handle ERR
            if (err) {
                // all other error case (unauthorized, etc)
                return callback(err);
            }

            if (httpResponse.statusCode == 200) {
                var secret = JSON.parse(body);
                // things are good - show the secret
                return callback(null, secret)
            }
            else {
                // all other error case (unauthorized, etc)
                return callback({ 'error': { 'message': body, statusCode: httpResponse.statusCode } });
            }
        });
    }
}

module.exports = Instaurl;