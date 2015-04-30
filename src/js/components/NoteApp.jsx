/**
 * @jsx React.DOM
 */

var React = require('react');
var Reflux = require("reflux");
var NoteListBox=require('./NoteListBox.jsx');
var NoteCreationBox=require('./NoteCreationBox.jsx');
var NoteActions = require("../actions/NoteActions.js");
var NoteStore = require("../stores/NoteStore.js")
var ParagraphActions = require("../actions/ParagraphActions.js")

var NoteApp = React.createClass({
    mixins:[Reflux.connect(NoteStore, "note")],
    onStatusChange:function(data){
    },
 
    getInitialState:function(){
        return {id:null}
    },

    onEdit:function(id){
        this.setState({currentlyEdited:id});
    },

    onAdd:function(){
        this.setState({currentlyEdited:null});
    },
    componentDidMount:function(){
    },

    render: function() {
        return (
            <div className="">
                <div className="container row header">
                    <div className="page-header">
                        <h1>Note</h1>
                    </div>
                </div>
                <div className="Document z-depth-2 row">
                    <NoteCreationBox note={this.state.note} />
                </div>
            </div>
        )
    }
});

module.exports=NoteApp;



React.render(<NoteApp />, document.getElementById('main'));