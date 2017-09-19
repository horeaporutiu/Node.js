var express = require('express');
var socket = require('socket.io');

//setup app
var app = express();
var server = app.listen(4000, function(){
    console.log('listening to port 4000');
});

app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id)
    //console.log(socket)
    socket.on('showUsername', function(name) {
        console.log('hi!')
        console.log(name)
        io.emit('showUsername', name)
    });
});