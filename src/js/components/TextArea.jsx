/**
 * @jsx React.DOM
 */

var React=require('react');
var NoteStore=require('../stores/NoteStore');
var Paragraph = require("./paragraph.jsx")
var TextArea = React.createClass({

    getInitialState:function(){
      //console.log(this.props)
        return {paragraphs: this.props.paragraphs,
            activeParagraph:"", 

        }
    },
    handleChange: function(event) {
        this.setState({noteText: event.target.value});
    },

    handleSave:function(){
       //this.props.onSave(this.state.noteText,this.props.id)
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({

            paragraphs: nextProps.paragraphs
        });

    },

    render: function() {
    var _onSave = this.props.onSave
        return (
            <div>
            {this.state.paragraphs.map(function(result){
                console.log(result.note_id)
               return <Paragraph className="form-control" note_id={result.note_id} ref="textArea"  paragraph={result} id={result.id}/>}

              )}
            </div>
        )
    }
});

module.exports=TextArea;