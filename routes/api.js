const express = require('express');
const router = express.Router();
var https = require('https');
var http = require('http');
var querystring = require('querystring');
var username = 'username';
var password = 'password';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

router.post('/translate', function(req,resp){
  var postData = querystring.stringify({
      'source' : req.body.source,
      'target': req.body.target,
      'text': req.body.text
  });

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

var req = https.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
    resp.send(chunk);
  });
});
req.write(postData);
req.end();
});

module.exports = router;
