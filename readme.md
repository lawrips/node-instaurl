# Instaurl
### Easy and secure sharing through one-time URL's
Before any usage, read our terms and privacy policy at www.instaurl.com

## Intro
Instaurl allows you to easily and securely post information to a service and get back a one-time URL which can be shared with another person, device or app.

## FAQ
Coming soon

## Usage
### Developer Token
First you'll need a developer token. Obtain one by emailing info@instaurl.com (this will be online / self serve soon)

### Initializing
Use the following code to initialize the Instaurl class (currently private repo):
```
var Instaurl = require('@lripsher/instaurl')
var instaurl = new Instaurl({token: your_developer_token});
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
2. Rename config/instaurl_sample.json config/instaurl.json
3. Open config/instaurl.json 
4. Replace the placeholder text with your developer token
5. Delete any of the comments in the file
6. From the root directory, run "mocha --debug test"

{
    "token": "your developer token goes here"
}