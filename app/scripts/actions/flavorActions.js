var Reflux = require('reflux');

var FlavorActions = Reflux.createActions([
  'fetchList',
  'listenToFlavors',
  'stopListening',
  'adminList',
  'createFlavor',
  'updateFlavor',
  'adminListenToFlavors'
]);

module.exports = FlavorActions;
