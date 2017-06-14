
// console.log('server started')
// We need this to build our post string
// var http = require('http');
// var fs = require('fs');
//
// // http.createServer(function(request, response) {
// //
// //
// //
// //
// // }).listen(8080);
// // console.log('server started')
//
// function PostCode(codestring) {
//   // Build the post string from an object

//
//   // An object of options to indicate where to post to
//   var post_options = {
//       host: 'gateway.watsonplatform.net',
//       port: '8080',
//       path: '/language-translator/api/v2/translate',
//       method: 'POST',
//       username: '64a3ecc4-182b-47e9-a659-c580a7b5ca02',
//       password: 'AnnGIdp6kCU7',
//       headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//       }
//   };
//
//   // Set up the request
//   var post_req = http.request(post_options, function(res) {
//       res.setEncoding('utf8');
//       res.on('data', function (chunk) {
//           console.log('Response: ' + chunk);
//       });
//   });
//
//   // post the data
//   post_req.write(post_data);
//   post_req.end();
//
// }
//
// // This is an async file read
// fs.readFile('hello.js', 'utf-8', function (err, data) {
//   if (err) {
//     // If this were just a small part of the application, you would
//     // want to handle this differently, maybe throwing an exception
//     // for the caller to handle. Since the file is absolutely essential
//     // to the program's functionality, we're going to exit with a fatal
//     // error instead.
//     console.log("FATAL An error occurred trying to read in the file: " + err);
//     process.exit(-2);
//   }
//   // Make sure there's data before we post it
//   if(data) {
//     PostCode(data);
//   }
//   else {
//     console.log("No data to post");
//     process.exit(-1);
//   }
//

// // const app = express();
// // const bodyParser = require('body-parser');
//
// router.get('/', function(req, res, next) {
// //  res.render('index', { title: 'Express' });
//     res.json({ result: 'success' });
// });
//
// // // initialize routes
// // app.use(function (req, res, next) {
// //   console.log('Time:', Date.now())
// //   next()
// // })
// // // listen for requests
// // app.listen(process.env.port || 4000, function(){
// //     console.log('now listening for requests');
// // });
//
// const express = require('express');
// const router = express.Router();
//
// router.post('/translate', function(req,res){
//   res.send({type:'POST'});
//
// });
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
