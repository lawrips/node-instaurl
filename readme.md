# Instaurl
### Easy and secure sharing through one-time URL's
Before any usage, read our terms and privacy policy at www.instaurl.com

## Intro
Instaurl is a service which makes it easy to securely share content through the use of "one-time URL's". A one time URL is a link that can only be viewed once. This ensures that once the content has been viewed, no one else can view it.

## FAQ
Read more at https://www.instaurl.com/about 

## Usage
### Developer Token
The Instaurl SDK comes with a token already provisioned. This is rate limited by IP address and will allow for basic testing. Scale / production use is coming soon. For more details, contact support@instaurl.com.

### Initializing
Use the following code to initialize the Instaurl class (currently private repo):
```
var Instaurl = require('@lripsher/instaurl')
var instaurl = new Instaurl({config});
```
config can be set by referencing the already included sample file (which contains the free token). E.g.:
```
var config = require('../config/instaurl.json')
``` 

### API
Once you have your object, you can now call one of the methods:
#### Set
To send a secret to the service and receive a one-time URL:
```
instaurl.set('my secret text', (err, result) => {
    if (err) console.log(err);
    console.log(result);
})
```
Sucessful calls will return a result object in the following format:
```
{
    "key": "1uU9sCBogUm3tumxx53mpw" 
    "webUrl": "https://www.instaurl.com/i/1uU9sCBogUm3tumxx53mpw"  
    "apiUrl": "https://www.instaurl.com/v1.0/url/1uU9sCBogUm3tumxx53mpw"
}
```
The meaning of each of these:
- key: the unique one-time secret key (appending to the following URL's)
- webUrl: the one-time URL which you can view the secret at from a web browser
- apiUrl: the one-time URL which you can use to view the secret via the REST API's

#### Get
To get a previously created secret from the service:
```
instaurl.get('myuniquekey', (err, result) => {
    if (err) console.log(err);
    console.log(result);
})
```
Sucessful calls will return a result object in the following format:
```
{
    "secret":"my secret text"
}
```

#### Errors
Errors take the following format:
```
{
    statusCode: 429,
    messgae: "Developer token limit exceeded. Try again in a short while" 
}
```    

### Running tests
To run the tests, go to the root directory of node-instaurl and:

1. Ensure you have mocha installed ("npm i mocha -g")
2. From the root directory, run "mocha --debug test"
