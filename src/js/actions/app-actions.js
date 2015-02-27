var AppConstants =  require('../constants/app-constants.js')
var AppDispatcher = require('../dispatchers/app-dispatcher.js')

var AppActions = {
    addItem: function(item){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_ITEM,
            item: item
        })
    }
}


module.exports = AppActions;