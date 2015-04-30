var Reflux = require("reflux");

var NoteActions = Reflux.createActions([
    'createNote',
    'editNote',
    'pullParagraphs',
    'viewNotes'
]);

module.exports = NoteActions