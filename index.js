//set up express application
const express = require('express');
var cors = require('cors');
const app = express();
var path = require('path')

// parse JSON requst body
const bodyParser = require('body-parser');
//set up routes and middleware
var router = express.Router();
var json = bodyParser.json();
var encoded = bodyParser.urlencoded({extended: true});
app.use(router);
app.use(express.static(path.join(__dirname, 'public')));

router.use(cors());
app.all('*', function(req,res,next) {
  res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE, OPTIONS");
  res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Origin, Accept, Content-Type");
  if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});
//import credentials from another file
var credentials = require('./credentials.js');

var https = require('https'); //needed to make our request
var querystring = require('querystring'); // used for JSON conversion
var username = credentials.myCredentials.username;
var password = credentials.myCredentials.password;
//for some reason, auth needs to be in base64
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

router.get('/', cors(), function(requ, res, next){
  res.sendFile(__dirname + '/public/index.html');
});

// if testing in postman, need to include json body parser. Encoded one is for UI
router.post('/translates', json, encoded, function(req,resp){ //our route
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
      var decoded_data = returnVal.toString('utf8');
      resp.send(decoded_data);
    });
  });
//needed to convert back into JSON
  req.write(postData);
  req.end();
});
app.listen(8080);
// object returned as part of require call
module.exports = router;
