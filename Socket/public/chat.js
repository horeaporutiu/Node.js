// Make Connection
var socket = io.connect("http://localhost:4000");

//Query DOM 
var nameTag = document.getElementById("name");

//Emit events
socket.on("showUsername", function(name){
    nameTag.innerHTML = "Hey " + name;
});