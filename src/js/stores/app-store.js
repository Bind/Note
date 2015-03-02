var AppConstants =  require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change"



var items = []

function _removeItem(index){

}


        var socket = io();
console.log("is this running")



var AppStore = merge(EventEmitter.prototype, {
    emitChange:function(){
        this.emit(CHANGE_EVENT)
    },
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback)
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;

        /* large switch case for all actions in this store*/
        AppStore.emitChange()
        return true;    
    })


})

module.exports = AppStore