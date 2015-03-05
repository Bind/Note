
module.exports = function(app, express, emitter){

    var router = express.Router();

    router.post('/gitpush', function(req, res){
        console.log("body of the req=",req.body)
        emitter.newMessage(body.commits[0].message)
    
})
    router.get('/', function(req, res){
    res.json({message: 'Right Now.'})
});
    app.use('/api', router)

}

