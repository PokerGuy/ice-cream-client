var Reflux = require('reflux');
var NonceActions = require('../actions/nonceActions');
var Constants = require('../constants/constants');
var request = require('superagent');

var NonceStore = Reflux.createStore({
  listenables: [NonceActions],
  nonce: {nonce: null, ccNumber: "", expYr: "", expMo: ""},

  getNonce: function() {
    request.get(Constants.APIEndpoints.NONCE)
    .set('Accept', 'application/json')
    .end(function (error, res) {
        if (res) {
          var json = JSON.parse(res.text);
          NonceStore.nonce.nonce = json.nonce;
          NonceStore.trigger(NonceStore.nonce);
        }
      })
  }
});

module.exports = NonceStore;
