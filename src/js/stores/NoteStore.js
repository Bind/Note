var Reflux = require('reflux');
var NoteActions = require("../actions/NoteActions.js");
var ParagraphStore = require("../stores/ParagraphStore.js");
var ParagraphActions = require("../actions/ParagraphActions.js")

var _notes = [];
var active_note = null;
var NoteStore = Reflux.createStore({
    getInitialState:function(){
        var _p_id = Date.now();
        var _id = Date.now();
        var _para = {
            text:"",
            note_id:_id,
            _id:_p_id,
            cursor: 0,
            active:true
            
        };
        var _note = {
            _id:_id,
            first_paragraph:_p_id,
            paragraphs:[_para]
                    }
        NoteActions.createNote(_note);
        ParagraphActions.createParagraph(_para);
        active_note = _note._id;
        return [_note];
    },
    init: function(){
        this.listenTo(NoteActions.createNote, this.onCreate);
        this.listenTo(NoteActions.editNote, this.onEdit); 
        this.listenTo(NoteActions.pullParagraphs, this.onEditParagraphs);
    },
    onCreate: function(note){
        _notes.push(note)
        this.trigger(_notes)
    },
    onEdit: function(note){
        for (var i = 0; i < _notes.length; i++){
            if (_notes[i]._id === note._id){
                _notes[i] = note._id
                this.trigger(_notes);
                break;
            }
        }
    },
    onEditParagraphs: function(note_id){
        for (var i = 0; i < _notes.length; i++){
            if (_notes[i]._id === note_id){
                _notes[i].paragraphs = ParagraphStore.getParagraphsByNote(note_id)
                this.trigger(_notes);
                break;
            }
        }

    },
    getActiveNote:function(){
        var id = active_note;
        for (var i = 0; i < _notes.length ; i++){
            if (_notes[i]._id === id){
                return _notes[i];
            }
        }
    },
    setActiveNote:function(_id){
        active_note = _id;
    },
    getNotes: function(){
        return _notes;
    },
    getNote: function(id){
        for (var i = 0; i < _notes.length ; i++){
            if (_notes[i]._id === id){
                return _notes[i];
            }
        }
    }
})

module.exports = NoteStore;
