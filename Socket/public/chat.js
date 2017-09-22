// Make Connection
var socket = io.connect('http://localhost:4001');

//Query DOM 
var nameTag = document.getElementById('name');
var translateTag = document.getElementById('translate');

//Emit events
socket.on('showUsername', function(name){
    console.log('about to say hi');
    nameTag.innerHTML = 'Hey ' + name;
});

socket.on('translate', function(translatedPhrase){
    console.log('were in the socket.io transalte client ');
    translateTag.innerHTML = 'your translated phrase is ' + translatedPhrase;
});