var express = require('express');
var socket = require('socket.io');
var jsonfile = require('jsonfile');
config = jsonfile.readFileSync( __dirname + '/config.json' );
var Watson = require('./watson.js')

//setup app
var app = express();
var server = app.listen(4001, function(){
    console.log('listening to port 4001!');
});

app.use(express.static('public'));

app.use(function (req, res, next){
    
      req.config = config;
    
      next();
    
    });

//Socket setup
var io = socket(server);


io.on('connection', function(socket){

    console.log('made socket connection', socket.id);

    socket.on('showUsername', function(name) {
        io.emit('showUsername', name);
    });

    socket.on('translate', function(phraseToTranslate){

        let watson = new Watson();        
        watson.translate(phraseToTranslate).then(function(phrase){
            io.emit('translate', phrase);     
        });
    });        
});
