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
    componentDidMount: function(){
        $.get(this.props.source, function(result){

        })
    },
    render:function(){
    return <h1 onClick={this.handleClick}>Build</h1>
}})

module.exports = App;