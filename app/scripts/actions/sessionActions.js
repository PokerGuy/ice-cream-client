var Reflux = require('reflux');

var SessionActions = Reflux.createActions([
  'login',
  'getSession'
]);

module.exports = SessionActions;
