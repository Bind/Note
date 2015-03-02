/** @jsx React.dom */

var React = require('react');
var AppActions = require('../actions/app-actions.js')
var App = 
React.createClass({
    getInitialState: function(){
        return {
            username:'',
            message: ''}
    },
    handleChangeMessage: function(e){
        this.setState({message: e.target.value})
    },
    componentDidMount:function(){
    var socket = io();
    //do ajaxy stuff here.

},
    componentWillReceiveProps:function(nextProps){
        //this.setState

    },
    render:function(){
        return (
            <div className="center">
            <p class="">Go build something.</p>
            </div>)
}
})

module.exports = App;