
module.exports = function(app, express, emitter){

    var router = express.Router();

    router.post('/gitpush', function(req, res){
        emitter.newMessage(req.body.commits[0].message)
    
})
    router.get('/', function(req, res){
    res.json({message: 'Right Now.'})
});
    app.use('/api', router)

}

