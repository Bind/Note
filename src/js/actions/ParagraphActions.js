var Reflux = require("reflux");

var ParagraphActions = Reflux.createActions([
    'createParagraph',
    'editParagraph',
    'deleteParagraph',
    'setActive',
    'setBeforeActive',
    'setAfterActive',
    'insertParagraph'
]);

module.exports = ParagraphActions