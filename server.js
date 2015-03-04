var express = require('express');
var app = express();
var http = require('http').Server(app);
var tweets = require('./bin/emitter');
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

var port = process.env.PORT || 8000;

var router  = express.Router();

router.get('/', function(req, res){
    res.json({message: 'Right Now.'})
});

/* ROUTES */
require('./routers/api')(app, express)


app.use('/', express.static(__dirname + '/dist'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/dist/index.html')
})

var twitter = new tweets();



twitter.on('error', function(err){
  console.log("failed wiht error",err)
})

twitter.on('success', function(){
  gutil.log("Emitter success")
})


twitter.newTweet("asdf")



io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(port, function(){
    gutil.log('Magic happens on port', port.toString().magenta);
});





