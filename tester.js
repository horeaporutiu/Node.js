// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write('Hello World!');
//   res.end();
// }).listen(8080);

var request = require('request');
var https = require('https');
var http = require('http');
var querystring = require('querystring');
var username = "03f2282e-db10-4f97-aae5-591ef9c0aa11";
var password = "XSoXnuFrkbKg";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
var textToSpeechUrl = "https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/text-to-speech/api";

http.createServer(function(req,response) {
  console.log('just createdserver');

  request({
    url:     textToSpeechUrl,
    headers : {
          "Authorization" : auth,
    }
  },
  function(error, response, body){
    console.log(body)

    resolve ({
      statusCode:200,
      headers : {
        "Content-Type" : "text/plain"
      },
      body: new Buffer (JSON.stringify(body)).toString('base64')
    });
  });


}).listen(8081);
