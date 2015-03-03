var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http)

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


app.use('/', express.static(__dirname + '/dist'));
app.use('/api', router);
app.get('/', function(req, res){
    res.sendFile(__dirname + '/dist/index.html')
})


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(port, function(){
    console.log('Magic happens on port ' + port);
});





