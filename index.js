//set up express application
const express = require('express');
const app = express();
// parse JSON requst body
const bodyParser = require('body-parser');
//set up routes and middleware
var router = express.Router();
app.use(bodyParser.json())
app.use(router);

var cred = require('./credentials');

var https = require('https'); //needed to make our request
var querystring = require('querystring'); // used for JSON conversion
var username = "64a3ecc4-182b-47e9-a659-c580a7b5ca02";
var password = "AnnGIdp6kCU7";
// console.log(cred.username)
//for some reason, auth needs to be in base64
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');


router.post('/translate', function(req,resp){ //our route
  // take in what JSON we pass into Postman, and save it
  var postData = querystring.stringify({
      'source' : req.body.source,
      'target': req.body.target,
      'text': req.body.text
  });
//pass in auth, HTTP method, and URL to make HTTP Request
var options = {
  host: 'gateway.watsonplatform.net',
  port: 443,
  path: '/language-translator/api/v2/translate',
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
  }
};
// set up our Request
var req = https.request(options, function(res) {
  //call back fired when there is a chunk of data
  res.on('data', function (returnVal) {
    //send our response to the client
    resp.send(returnVal);
  });
});
//needed to convert back into JSON
req.write(postData);
req.end();
});
//go to localhost:4000
app.listen(4000);
// object returned as part of require call
module.exports = router;
