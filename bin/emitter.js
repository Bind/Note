var util = require("util")
var EventEmitter = require('events').EventEmitter;


var emitter = function(){
    EventEmitter.call(this);

        var _save = function(message, callback){
            this.emit('saved', message)
        }
        var _send = function(message, callback){
            this.emit('success')
            //this.emit('error', new Error("unable to sendmessage"))
        }
        var _success = function(message, calback){
            this.emit('success', message)
        }

        this.newMessage = function(message, callback){
            this.emit('beginRegistration', message)
        }

        this.on('beginRegistration', _save);
        this.on('saved', _send);
        this.on('sent', _success);
}

util.inherits(emitter, EventEmitter);
module.exports = emitter