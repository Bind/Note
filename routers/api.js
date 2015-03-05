
module.exports = function(app, express){

    var router = express.Router();

    router.post('/gitpush', function(req, res){
        console.log("boyd of the req=",req.body)
    
})
    router.get('/', function(req, res){
    res.json({message: 'Right Now.'})
});
    app.use('/api', router)

}

