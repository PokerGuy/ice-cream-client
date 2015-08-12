var Reflux = require('reflux');
var PaidOrdersActions = require('../actions/paidOrdersActions');
var Constants = require('../constants/constants');
var request = require('superagent');
var SessionStore = require('./sessionStore');
var _ = require('underscore');

var PaidOrdersStore = Reflux.createStore({
  listenables: [PaidOrdersActions],
  paidOrders: [],
  source: null,

  getOrders: function () {
    this.paidOrders.errors = [];
    request.get(Constants.APIEndpoints.ORDER)
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .set('access-token', SessionStore.session.accessToken)
      .set('uid', SessionStore.session.uid)
      .set('client', SessionStore.session.client)
      .end(function (error, res) {
        if (res) {
          var json = JSON.parse(res.text);
          if (!(json.error)) {
            if (res.header['access-token']) {
              SessionStore.session.accessToken = res.header['access-token'];
              SessionStore.trigger(SessionStore.session);
              sessionStorage.setItem('session', JSON.stringify(SessionStore.session));
            }
          }
          PaidOrdersStore.paidOrders = JSON.parse(res.text);
        } else {
          PaidOrdersStore.paidOrders.errors = json.error;
        }
        PaidOrdersStore.trigger(PaidOrdersStore.paidOrders);
      })
  },

  completeOrder: function (id) {
    this.paidOrders.errors = [];
    request.put(Constants.APIEndpoints.ORDER + '/' + id)
      .send({
        order: {
          status: "complete"
        }
      })
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .set('access-token', SessionStore.session.accessToken)
      .set('uid', SessionStore.session.uid)
      .set('client', SessionStore.session.client)
      .end(function (error, res) {
        if (res) {
          var json = JSON.parse(res.text);
          if (!(json.error)) {
            if (res.header['access-token']) {
              SessionStore.session.accessToken = res.header['access-token'];
              SessionStore.trigger(SessionStore.session);
              sessionStorage.setItem('session', JSON.stringify(SessionStore.session));
            }
            PaidOrdersStore.getOrders();
          }
        } else {
          PaidOrdersStore.paidOrders.errors = json.error;
          PaidOrdersStore.trigger(PaidOrdersStore.paidOrders);
        }
      })
  },
  listenToOrders: function() {
    this.source = new EventSource(Constants.Listener.Root);
    this.source.onmessage = function(event) {
      var json = JSON.parse(event.data);
      if (json.type === 'newOrder') {
        PaidOrdersStore.getOrders();
      }
    }
  },
  stopListeningToOrders: function() {
    this.source.close;
    this.trigger(this.source);
  }
});

module.exports = PaidOrdersStore;
