var express = require('express')
var app = express();

var mongoose = require("mongoose");

var mongooseUrl =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/reactapi';
    
mongoose.connect(mongooseUrl);
var db = mongoose.connection;

var port = process.env.PORT || 8000;

var router  = express.Router();

router.get('/', function(req, res){
    res.json({message: 'returning stuff'})
});



app.use(express.static('dist'))
app.use('/api', router);
app.get('/', function(req, res){
    res.sendFile('index.html')
})
app.listen(port)
console.log('Magic happens on port ' + port);


