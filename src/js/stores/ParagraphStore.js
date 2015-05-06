var Reflux = require('reflux');
var ParagraphActions = require("../actions/ParagraphActions.js");
var NoteActions = require("../actions/NoteActions.js")

var _paragraphs = [];
var _active_index=0;
var ParagraphStore = Reflux.createStore({
    init: function(){
        this.listenTo(ParagraphActions.createParagraph, this.onCreate);
        this.listenTo(ParagraphActions.insertParagraph, this.onInsert);
        this.listenTo(ParagraphActions.editParagraph, this.onEdit);  
        this.listenTo(ParagraphActions.deleteParagraph,this.onDelete);
        this.listenTo(ParagraphActions.setActive, this.onSetActive);
        this.listenTo(ParagraphActions.setBeforeActive, this.onSetBeforeActive);
        this.listenTo(ParagraphActions.setAfterActive, this.onSetAfterActive);
    },
    onCreate:function(paragraph){
        _paragraphs.push(paragraph)
        this.onSetActive(paragraph)        
        this.trigger(_paragraphs)
    },
    onInsert: function(paragraph, previous){
        console.log("creating")

        for (var i = 0; i < _paragraphs.length; i++){
            if (_paragraphs[i]._id === previous._id){
                _paragraphs[i].active = false;

                _paragraphs.splice(i+1,0,paragraph);
                _active_index = i+1;
                console.log(_active_index);
                NoteActions.pullParagraphs(paragraph.note_id);
                break;
            }
        }       
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
                _active_index = i;
                console.log(_active_index);

                NoteActions.pullParagraphs(note_id);
            } else{
                _paragraphs[i].active = false;
            } 
        }
    },
    onSetAfterActive: function(paragraph){
        for (var i = 0; i < _paragraphs.length; i++){
            if (_paragraphs[i]._id === paragraph._id ){
                if (_paragraphs.length-1 > i){
                var note_id = paragraph.note_id
                _paragraphs[i+1].active = true;
                _paragraphs[i].active = false;
                _active_index = i+1;
                console.log(_active_index);
                NoteActions.pullParagraphs(note_id);
                this.trigger(_paragraphs)
                }
            } 
        }
    },
    onSetBeforeActive: function(paragraph){
        for (var i = 0; i < _paragraphs.length; i++){
            if (_paragraphs[i]._id === paragraph._id){
                if (i > 0){
                    var note_id = paragraph.note_id
                    _paragraphs[i-1].active = true;
                    _paragraphs[i].active = false;
                    _active_index = i-1;
                    console.log(_active_index);

                    NoteActions.pullParagraphs(note_id);
                    this.trigger(_paragraphs)

                }
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
