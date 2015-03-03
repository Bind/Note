/** @jsx React.dom */

var React = require('react');
var AppActions = require('../actions/app-actions.js')
var App = 
React.createClass({
    getInitialState: function(){
        return {

            messages: ['Go Build Something.']}
    },
    handleChangeMessage: function(e){
        this.setState({message: e.target.value})
    },
    componentDidMount:function(){
    $.ajax({url: "/api/"}).done(function(response){
        var _messages = this.state.messages;
        _messages.push(response.message);
        console.log(_messages)
        this.setState({messages: _messages});
    }.bind(this))

    //do ajaxy stuff here.

},
    componentWillReceiveProps:function(nextProps){
        //this.setState

    },
    render:function(){
        //console.log(this)
        var nodes = this.state.messages.map(function(message){
            return <p class="">{message}</p>
        })


        return (
            <div className="center">
                {nodes}
            </div>)
}
})

module.exports = App;