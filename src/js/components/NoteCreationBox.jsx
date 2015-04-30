/**
 * @jsx React.DOM
 */

var React = require('react');
var TextArea=require('./TextArea.jsx');

var NoteActions = require('../actions/NoteActions.js');
var ParagraphActions = require("../actions/ParagraphActions.js");
var ParagraphStore = require("../stores/ParagraphStore.js")
var NoteStore = require('../stores/NoteStore.js');

var NoteCreationBox = React.createClass({
    getInitialState:function(){
       // console.log(this.props)
        return {
            paragraphs: this.props.note[0].paragraphs,
            id: this.props.note[0]._id
        }
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({
            paragraphs: nextProps.note[0].paragraphs,
            id: this.props.note[0]._id
        })
    },

    render: function() {

        //debugger;
  

        return (
            <div className="col-md-8">
                <TextArea note_id={this.state.id} paragraphs={this.state.paragraphs ? this.state.paragraphs : []} />
            </div>
        )
    }
});

module.exports=NoteCreationBox;