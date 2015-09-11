var Reflux = require('reflux');

var OrderActions = Reflux.createActions([
  'createOrder',
  'addItem',
  'deleteItem',
  'purchaseOrder',
  'pickFlavor',
  'updateQuantity',
  'setPrice',
  'purchase',
  'cancel',
  'complete',
  'preSelected'
]);

module.exports = OrderActions;
