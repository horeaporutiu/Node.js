// Make Connection
var socket = io.connect('http://localhost:4001');
var messageCount = 0;
var isUser = true;
var fromWatson = 'watson';
var fromUser = 'user';

//Query DOM 
var output = document.getElementById('output'),
    message = document.getElementById('message'),
    translate = document.getElementById('translate'),
    pointer = document.getElementById('fontAwsome'),
    bottomDiv = document.getElementById('sendArrow'),        
    chatDiv = document.getElementById('chat-window');
    
    //TODO: scrollTo method to latest div.

//Emit events

message.addEventListener('keypress', function(key){
    if (key.keyCode === 13 ) {
        socket.emit('chat', {
            message: message.value
        });
        // TODO: uncoomment line below. that one is only for debugging purposes
       message.value = '';
    }
    
})

//Write message when user clicks on paper plane icon
pointer.addEventListener("click", function(){ 
    socket.emit('chat', {
        message: message.value
    });
    message.value = '';    
    
});

socket.on('translate', function(translatedPhrase){
    console.log('were in the socket.io transalte client ');
    console.log(translatedPhrase)
    translate.innerHTML = 'your translated phrase is ' + translatedPhrase;
});

socket.on('chat', function(data){
    messageCount++;
    console.log(messageCount)

    if (messageCount % 2 === 1) {

        output.innerHTML += '<div class=' + fromUser + '>' + '<div class=' + 'bubble' + '>'+ '<p>' + data.message + '</p>' + '</div>'; 
        
    } else {

        output.innerHTML += '<div class=' + fromWatson  + '>' + '<div class=' + 'bubble' + '>'+ '<p>' + data.message + '</p>' + '</div>' + '</div>'; 
        
    }
    chatDiv.scrollTop = chatDiv.scrollHeight;
    

});
