'use strict'

const http = require('request');


class Instaurl {
    constructor(options) {
        this.token = options.token;
        this.baseUrl = 'https://www.instaurl.com/v1.0/';
        if (options.developerUrl) {
            this.baseUrl = options.developerUrl;
        }        
        this.getUrl = this.baseUrl + 'url/';
        this.postUrl = this.baseUrl + 'url';
    }

    set(secret, callback) {
        let options = {
            url: this.postUrl,
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
                return callback({ 'message': body, statusCode: httpResponse.statusCode });
            }
        });
    }


    get(key, callback) {
        let options = {
            url: this.getUrl + key,
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
                // things are good - show the secret
                return callback(null, JSON.parse(body))
            }
            else if (httpResponse.statusCode == 410) {
                // expired key
                return callback({ message: JSON.parse(body).message, expiredAt: JSON.parse(body).expiredAt, statusCode: httpResponse.statusCode });
            }
            else {
                // all other error case (unauthorized, etc)
                return callback({ message: JSON.parse(body).message, statusCode: httpResponse.statusCode });
            }
        });
    }
}

module.exports = Instaurl;