var Reflux = require('reflux');
var FlavorActions = require('../actions/flavorActions');
var Constants = require('../constants/constants');
var request = require('superagent');
var SessionStore = require('./sessionStore');
var _ = require('underscore');

var FlavorStore = Reflux.createStore({
  listenables: [FlavorActions],
  flavorList: [{errors: []}],
  listener: null,

  fetchList: function () {
    request.get(Constants.APIEndpoints.FLAVORS)
      .set('Accept', 'application/json')
      .end(function (error, res) {
        if (res) {
          var json = JSON.parse(res.text);
          FlavorStore.flavorList = json.flavors;
          FlavorStore.trigger(FlavorStore.flavorList);
        }
      })
  },
  listenToFlavors: function () {
    this.listener = new EventSource(Constants.Listener.Root);
    this.listener.onmessage = function (event) {
      var json = JSON.parse(event.data);
      if (json.type === 'flavorChange') {
        var changed = _.find(FlavorStore.flavorList, function (flavor) {
          return flavor.id == json.id
        });
        if (changed) {
          changed.stock_quantity = json.stock_quantity;
        } else {
          FlavorStore.flavorList.unshift({
            id: json.id,
            name: json.name,
            stock_quantity: json.stock_quantity,
            price: json.price
          });
        }
      }
      FlavorStore.trigger(FlavorStore.flavorList);
    }
  },

  adminListenToFlavors: function () {
    this.listener = new EventSource(Constants.Listener.Root);
    this.listener.onmessage = function (event) {
      var json = JSON.parse(event.data);
      if (json.type == 'flavorChange') {
        FlavorStore.adminList();
      }
    }
  }
  ,

  stopListening: function () {
    this.listener.close();
  }
  ,

  adminList: function () {
    request.get(Constants.APIEndpoints.ADMIN_FLAVORS)
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .set('access-token', SessionStore.session.accessToken)
      .set('uid', SessionStore.session.uid)
      .set('client', SessionStore.session.client)
      .end(function (error, res) {
        var json = JSON.parse(res.text);
        if (res.header['access-token']) {
          SessionStore.session.accessToken = res.header['access-token'];
          SessionStore.session.client = res.header['client'];
          SessionStore.trigger(SessionStore.session);
          sessionStorage.setItem('session', JSON.stringify(SessionStore.session));
        }
        if (res.status == 200) {
          FlavorStore.flavorList = json.flavors;
          FlavorStore.trigger(FlavorStore.flavorList);
        } else if (res.status == 422) {
          FlavorStore.flavorList.errors = json.error;
          FlavorStore.trigger(FlavorStore.flavorList);
        } else {
          FlavorStore.flavorList.errors = [{error: "You must be logged in to see this page."}];
          FlavorStore.trigger(FlavorStore.flavorList);
        }

      });
  }
  ,

  createFlavor: function (name, qty, price, description, ingredients) {
    request.post(Constants.APIEndpoints.FLAVORS)
      .send({
        flavor: {
          name: name,
          stock_quantity: qty,
          description: description,
          ingredients: ingredients,
          prices_attributes: [{price: price}]
        }
      })
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .set('access-token', SessionStore.session.accessToken)
      .set('uid', SessionStore.session.uid)
      .set('client', SessionStore.session.client)
      .end(function (error, res) {
        if (res) {
          if (res.header['access-token']) {
            SessionStore.session.accessToken = res.header['access-token'];
            SessionStore.session.client = res.header['client'];
            SessionStore.trigger(SessionStore.session);
            sessionStorage.setItem('session', JSON.stringify(SessionStore.session));
          }
          var json = JSON.parse(res.text);
          if (res.status == 200) {
            FlavorStore.adminList();
          } else {
            FlavorStore.flavorList.errors = json.error;
            FlavorStore.trigger(FlavorStore.flavorList);
          }
        }
      });
  },

  updateFlavor: function (id, name, qty, description, ingredients) {
    request.put(Constants.APIEndpoints.FLAVORS + '/' + id)
      .send({
        flavor: {
          name: name,
          stock_quantity: qty,
          description: description,
          ingredients: ingredients
        }
      })
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .set('access-token', SessionStore.session.accessToken)
      .set('uid', SessionStore.session.uid)
      .set('client', SessionStore.session.client)
      .end(function (error, res) {
        if (res) {
          if (res.header['access-token']) {
            SessionStore.session.accessToken = res.header['access-token'];
            SessionStore.session.client = res.header['client'];
            SessionStore.trigger(SessionStore.session);
            sessionStorage.setItem('session', JSON.stringify(SessionStore.session));
          }
          var json = JSON.parse(res.text);
          if (res.status == 200) {
            $.growl({
              title: "Success",
              message: "You have successfully updated the flavor",
              style: "notice",
              size: "large",
              location: "tc"
            });
          } else {
            FlavorStore.flavorList.errors = json.error;
            FlavorStore.trigger(FlavorStore.flavorList);
          }
        }
      })
  },

  allFlavors: function () {
    request.get(Constants.APIEndpoints.FLAVORS_ALL)
      .set('Accept', 'application/json')
      .end(function (error, res) {
        if (res) {
          var json = JSON.parse(res.text);
          FlavorStore.flavorList = json.flavors;
          FlavorStore.trigger(FlavorStore.flavorList);
        }
      })
  }
});

module.exports = FlavorStore;
