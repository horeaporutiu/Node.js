//set up express application
const express = require('express');
const app = express();
// parse JSON requst body
const bodyParser = require('body-parser');
//set up routes and middleware
var router = express.Router();
var json = bodyParser.json();
var encoded = bodyParser.urlencoded({extended: true});
app.use(router);
var poop = ""
//import credentials from another file
var credentials = require('./credentials.js');

var https = require('https'); //needed to make our request
var querystring = require('querystring'); // used for JSON conversion
var username = credentials.myCredentials.username;
var password = credentials.myCredentials.password;
//for some reason, auth needs to be in base64
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

router.get('/', function(requ, respo){
  respo.sendFile(__dirname + '/public/index.html')

});

router.post('/clientSideTranslation', encoded, function(req,respo){
  // var username = req.body.username;
  // res.send(username);

  var postData = querystring.stringify({
      'source' : req.body.source,
      'target': req.body.target,
      'text': req.body.text
  });
//pass in auth, HTTP method, and URL to make HTTP Request
var options = {
  host: 'gateway.watsonplatform.net',
  path: '/language-translator/api/v2/translate',
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
  }
};
// set up our Request
var req = https.request(options, function(res) {
  //call back fired when there is a chunk of data
  res.on('data', function (returnVal) {
    //send our response to the client
    var decoded_data = returnVal.toString('utf8');

    respo.send(decoded_data);

  });
});

req.write(postData);
req.end();
  //var password = req.body.password;
});

router.post('/translate', json, function(req,resp){ //our route
  // take in what JSON we pass into Postman, and save it
  var postData = querystring.stringify({
      'source' : req.body.source,
      'target': req.body.target,
      'text': req.body.text
  });
//pass in auth, HTTP method, and URL to make HTTP Request
var options = {
  host: 'gateway.watsonplatform.net',
  path: '/language-translator/api/v2/translate',
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
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
