var Reflux = require('reflux');
var ParagraphActions = require("../actions/ParagraphActions.js");
var NoteActions = require("../actions/NoteActions.js")

var _paragraphs = [];
var ParagraphStore = Reflux.createStore({
    init: function(){
        this.listenTo(ParagraphActions.createParagraph, this.onCreate);
        this.listenTo(ParagraphActions.insertParagraph, this.onInsert);
        this.listenTo(ParagraphActions.editParagraph, this.onEdit);  
        this.listenTo(ParagraphActions.deleteParagraph,this.onDelete);
        this.listenTo(ParagraphActions.setActive, this.onSetActive)
    },
    onCreate:function(paragraph){
        _paragraphs.push(paragraph)
        this.onSetActive(paragraph)        
        this.trigger(_paragraphs)
    },
    onInsert: function(paragraph, previous){
        console.log("creating")
        console.log(previous)
                console.log(_paragraphs)

        for (var i = 0; i < _paragraphs.length; i++){
            if (_paragraphs[i]._id === previous._id){
                _paragraphs.splice(i+1,0,paragraph) ;
                NoteActions.pullParagraphs(paragraph.note_id);
                break;
            }
        }
        this.onSetActive(paragraph)        
        this.trigger(_paragraphs)
    },
    onEdit: function(paragraph){
        for (var i = 0; i < _paragraphs.length; i++){
            if (_paragraphs[i]._id === paragraph._id){
                _paragraphs[i].text = paragraph.text;
                NoteActions.pullParagraphs(paragraph.note_id);
                this.trigger(_paragraphs);
                break;
            }
        }
    },
    onDelete:function(paragraph){
        if(_paragraphs.length > 1){
            for (var i = 0; i < _paragraphs.length; i++){
            if (_paragraphs[i]._id === paragraph._id){
                var note_id = paragraph.note_id
                _paragraphs = [].concat(_paragraphs.slice(0,i), _paragraphs.slice(i+1))
                this.onSetActive(_paragraphs[i-1])
                NoteActions.pullParagraphs(note_id);
                this.trigger(_paragraphs);
                break;
                }
            }
        }
    },
    onSetActive: function(paragraph){
        for (var i = 0; i < _paragraphs.length; i++){
            if (_paragraphs[i]._id === paragraph._id){
                var note_id = paragraph.note_id
                _paragraphs[i].active = true;
                NoteActions.pullParagraphs(note_id);
            } else{
                _paragraphs[i].active = false;
            } 
        }
    },
    getParagraphs: function(){
        return _paragraphs;
    },
    getParagraphsByNote:function(id){

        return _paragraphs.filter(function(result){
            return result.note_id = id
        });
    },
    getParagraph: function(id){
        for (var i = 0; i < _paragraphs.length ; i++){
            if (_paragraphs[i]._id === id){
                return _paragraphs[i];
            }
        }
    }

})

module.exports = ParagraphStore;
