var express = require('express');
var app = express();
var http = require('http').Server(app);
var emitter = require('./bin/emitter'),
  bodyParser = require("body-parser");
var io = require('socket.io')(http)

var gutil = require("gulp-util")

gutil.log = require('./bin/log');
var colors = require('colors')
var mongoose = require("mongoose");



var mongooseUrl =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/reactapi';
    
//mongoose.connect(mongooseUrl);
//var db = mongoose.connection;


/* MIDDLEWARE*/
app.use( bodyParser.json() );       // to support JSON-encoded bodies


var port = process.env.PORT || 8080;

var router  = express.Router();

router.get('/', function(req, res){
    res.json({message: 'Right Now.'})
});


var dispatcher = new emitter();


/* ROUTES */
require('./routers/api')(app, express, dispatcher)

app.use('/', express.static(__dirname + '/dist'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/dist/index.html')
})

dispatcher.on('error', function(err){
  console.log("failed wiht error",err)
})


io.sockets.on('connection', function(socket){

        dispatcher.newMessage("In Real Time")

        socket.on('disconnect', function(){

              console.log('a user disconnected');

        });

        dispatcher.on('success', function(message){
           io.emit('message', message);
        })



});


http.listen(port, function(){
    gutil.log('Magic happens on port', port.toString().magenta);
});





