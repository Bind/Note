var Reflux = require("reflux");

var ParagraphActions = Reflux.createActions([
    'createParagraph',
    'editParagraph',
    'deleteParagraph',
    'setActive',
    'insertParagraph'
]);

module.exports = ParagraphActions