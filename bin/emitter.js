var util = require("util")
var EventEmitter = require('events').EventEmitter;


var emitter = function(){
    EventEmitter.call(this);

        var _save = function(tweet, callback){
            this.emit('saved', tweet)
        }
        var _send = function(tweet, callback){
            this.emit('success')
            //this.emit('error', new Error("unable to sendtweet"))
        }
        var _success = function(tweet, calback){
            this.emit('success', tweet)
        }

        this.newTweet = function(tweet, callback){
            this.emit('beginRegistration', tweet)
        }
        this.on('beginRegistration', _save);
        this.on('saved', _send);
        this.on('sent', _success);
}

util.inherits(emitter, EventEmitter);
module.exports = emitter