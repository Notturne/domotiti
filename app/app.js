
var express = require('express');
var app = express();
var io = require('socket.io')(app.listen(8082));
var five = require("johnny-five");

var blink = true;

app.use(express.static(__dirname + '/app'));

app.get('/', function (req,res) { 
  	res.sendFile(__dirname  + '/index.html');
});
 

var board = new five.Board({
  	repl:false
});



board.on('ready', function () {
    
    var ledA = new five.Led(12);
    var ledB = new five.Led(13);

    var lights = new five.Leds([ledA,ledB]);
    var nlights = lights.length;

    io.on('connection', function (socket) {
	socket.on('on', function (data){
		for(var i=0; i< nlights;i++){
			console.log(data, "+", lights[i].pin);
			if(data === lights[i].pin){
				console.log("hola");
				lights[i].on();
			}
		}
	});
   

	socket.on('off', function (data){
		for(var i=0; i< nlights;i++){
			console.log(data, "+", lights[i].pin);
			if(data === lights[i].pin){
				console.log("Chao");
				lights[i].off();
			}
		}
	});

    }); 
});
