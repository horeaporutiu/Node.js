

var https = require('https');
var http = require('http');
var querystring = require('querystring');
var username = '64a3ecc4-182b-47e9-a659-c580a7b5ca02';
var password = 'AnnGIdp6kCU7';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

http.createServer(function(request,response) {
  console.log('just createdserver')

    var postData = querystring.stringify({
        'source' : 'English',
        'target': 'Spanish',
        'text': 'where is the bathroom?'
    });
    console.log('about to hit options')

  var options = {
  host: 'gateway.watsonplatform.net',
  port: 443,
  path: '/language-translator/api/v2/translate',
  method: 'POST',
  headers: {
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      // 'Content-Length': post_data.length,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
  }
  };

  var req = https.request(options, function(res) {
    console.log('inside https.request')

    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);

    });
  });

  req.on('error', function(e) {
    console.log('inside req.on?')
    console.log('problem with request: ' + e.message);
  });
  console.log('about to req.write')
  // write data to request body
  req.write(postData);
  req.end();
  response.end()
  console.log('after response.end()')

}).listen(8081);
console.log('server started')
