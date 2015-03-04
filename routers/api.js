var express = require('express');
var app = express();

var router  = express.Router();

router.post('/git', function(req, res){
    
})
router.get('/', function(req, res){
    res.json({message: 'Right Now.'})
});
