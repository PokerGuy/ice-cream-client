var Reflux = require('reflux');

var BlogActions = Reflux.createActions([
  'getTitles',
  'getBlog'
]);

module.exports = BlogActions;
