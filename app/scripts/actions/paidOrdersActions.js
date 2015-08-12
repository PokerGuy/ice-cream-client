var Reflux = require('reflux');

var PaidOrdersActions = Reflux.createActions([
  'getOrders',
  'completeOrder',
  'listenToOrders',
  'stopListeningToOrders'
]);

module.exports = PaidOrdersActions;
