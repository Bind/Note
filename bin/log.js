var chalk = require('colors');
var dateformat = require('dateformat');

module.exports = function(){
  var time = '['+dateformat(new Date(), 'HH:MM:ss').gray+']';
  var args = Array.prototype.slice.call(arguments);
  args.unshift(time);
  console.log.apply(console, args);
  return this;
};
