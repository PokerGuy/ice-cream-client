var Reflux = require('reflux');
var OrderActions = require('../actions/orderActions.js');
var Constants = require('../constants/constants.js');
var request = require('superagent');
var _ = require('underscore');

var OrderStore = Reflux.createStore({
  listenables: [OrderActions],
  order: null,
/*  total: 0,
  errors: [], */

  getInitialState: function () {
    this.createOrder();
    return this.order;
  },
  createOrder: function () {
    this.order = {status: "draft", total: 0, errors: [], lineItems: [{id: 1, flavorId: 0, flavorName: "", qty: 1, price: 0}]};
  },
  pickFlavor: function (lineItemId, flavor) {
    var lineItem = _.find(this.order.lineItems, function (item) {
      return item.id === lineItemId
    })
    if (lineItem) {
      var components = flavor.split(":");
      lineItem.flavorId = components[0];
      lineItem.flavorName = components[1];
      lineItem.price = components[2];
    }
    this.updateTotal();
    this.trigger(this.order);
  },
  addItem: function () {
    var newId = 1;
    if (this.order.lineItems.length > 0) {
      var highId = _.max(this.order.lineItems, function (o) {
        return o.id;
      });
      newId = highId.id++;
    }
    this.order.lineItems.push({id: newId, flavorId: 0, flavorName: "", qty: 1, price: 0});
    this.trigger(this.order);
  },
  deleteItem: function (lineItemId) {
    this.order.lineItems = _.without(this.order.lineItems, _.findWhere(this.order.lineItems, {id: lineItemId}));
    this.updateTotal();
    this.trigger(this.order);
  },
  updateQuantity: function (lineItemId, qty) {
    var lineItem = _.find(this.order.lineItems, function (item) {
      return item.id === lineItemId
    });
    if (lineItem) {
      lineItem.qty = qty;
    }
    this.updateTotal();
    this.trigger(this.order);
  },
  setPrice: function (lineItemId, price) {
    var lineItem = _.find(this.order.lineItems, function (item) {
      return item.id === lineItemId
    })
    if (lineItem) {
      lineItem.price = price;
    }
    this.updateTotal();
    this.trigger(this.order);
  },
  updateTotal: function () {
    var tot = 0;
    for (i = 0; i < this.order.lineItems.length; i++) {
      tot += this.order.lineItems[i].price * this.order.lineItems[i].qty;
    }
    this.order.total = tot;
  },
  purchase: function () {
    this.order.status = "new";
    this.trigger(this.order);
  },
  cancel: function () {
    this.order.status = "draft";
    this.order.errors = [];
    this.trigger(this.order);
  },
  setName: function (name) {
    this.order.name = name;
    this.trigger(this.order);
  },
  setPhone: function (phone) {
    this.order.phone = phone;
    this.trigger(this.order);
  },
  complete: function (nonce) {
    OrderStore.order.errors = [];
    var orderLineItems = [];
    for (i=0; i < OrderStore.order.lineItems.length; i++) {
      orderLineItems.push({flavor_id: OrderStore.order.lineItems[i].flavorId, quantity: OrderStore.order.lineItems[i].qty});
    }
    request.post(Constants.APIEndpoints.ORDER)
      .send({
        order: {name: OrderStore.order.name, phone_number: OrderStore.order.phone, nonce: nonce, order_line_items_attributes: orderLineItems}
      }
    )
      .set('Accept', 'application/json')
      .end(function (error, res) {
        if (res) {
          var json = JSON.parse(res.text);
          if (!(json.error)) {
            OrderStore.order.status = "paid";
            OrderStore.trigger(OrderStore.order);
          } else {
            OrderStore.order.errors = json.error;
            OrderStore.trigger(OrderStore.order);
          }
        }
      })
  }
});


module.exports = OrderStore;
