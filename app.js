//Setup our app
var request = require('request');
var express = require('express');
var app = express();

var path = require('path');
var jsonfile = require('jsonfile');
config = jsonfile.readFileSync( __dirname + '/config.json' );
var insertToDB = require('./insertToDatabase.js');

//Middleware to parse JSON request body
var bodyParser = require('body-parser');
var json = bodyParser.json();
var encoded = bodyParser.urlencoded({extended: true});

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next){

  req.config = config;

  next();

});

var https = require('https'); //needed to make our request
var querystring = require('querystring'); // used for JSON conversion
var auth = 'Basic ' + new Buffer(config.translateUsername + ':' + config.translatePassword).toString('base64');
//for some reason, auth needs to be in base64
// app.get('/', function(requ, res, next){
//   res.sendFile(__dirname + '/public/index.html');
// });

//app.use( '/', require( './public/js/watson.js' ) );
app.use( '/', express.static( 'public' ) );


// if testing in postman, need to include json body parser. Encoded one is for UI
app.post('/translates', json, encoded, function(req,resp){

  //Data from UI
  var postData = {
      'source' : req.body.source,
      'target': req.body.target,
      'text': req.body.text
  };

insertToDB.insert(req,postData);

//pass in auth, HTTP method, and URL to make HTTP Request
  var options = {
    host: 'gateway.watsonplatform.net',
    path: '/language-translator/api/v2/translate',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': auth
    }
  };
// set up our Request
  var watsonTranslateReq = https.request(options, function(res) {
    //call back fired when there is a chunk of data
    res.on('data', function (returnVal) {
      //send our response to the client
      var decoded_data = returnVal.toString('utf8');
      resp.send(decoded_data);
    });
  });
//needed to convert back into JSON
  watsonTranslateReq.write(querystring.stringify(postData));
  watsonTranslateReq.end();
});

app.listen(8080);
// object returned as part of require call
module.exports = app;
