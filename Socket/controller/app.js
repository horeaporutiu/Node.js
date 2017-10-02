var express = require('express');
var socket = require('socket.io');
var jsonfile = require('jsonfile');
config = jsonfile.readFileSync( __dirname + '/config.json' );
var Watson = require('../model/watson.js')
var Cloudant = require('../model/cloudant.js')


//setup app
var app = express();
var server = app.listen(4001);
console.log('listening to port 4001');

app.use(express.static('view'));

let watson = new Watson();
let cloudant = new Cloudant();

//Socket setup & server
var io = socket(server);
io.on('connection', function(socket){

    socket.on('translate', function(phraseToTranslate){
        console.log('inside server side translate')
        
        watson.translate(phraseToTranslate).then(function(phrase){
            io.emit('translate', phrase);     
        });
    });  

    console.log(socket.id)
    
    //Handle chat event
    socket.on('chat', function(userInput){

        //Call Cloudant database on userInput
        cloudant.insert(userInput);        

        watson.talkToWatson(userInput.message).then(function(output){
            
            io.emit('chat', {message: output})
            
        });
        io.emit('chat', userInput);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing',data);
    });

});
