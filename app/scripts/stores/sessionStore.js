var Reflux = require('reflux');
var SessionActions = require('../actions/sessionActions');
var Constants = require('../constants/constants');
var request = require('superagent');

var SessionStore = Reflux.createStore({
  listenables: [SessionActions],
  session: {},

  login: function (email, password) {
    request.post(Constants.APIEndpoints.LOGIN)
      .send({
        email: email, password: password
      })
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .end(function (error, res) {
        if (res) {
          var json = JSON.parse(res.text);
          SessionStore.session.email = json.data.email;
          SessionStore.session.uid = json.data.uid;
          SessionStore.session.provider = json.data.provider;
          SessionStore.session.first_name = json.data.first_name;
          SessionStore.session.last_name = json.data.last_name;
          SessionStore.session.errors = [];
          SessionStore.session.client = res.header['client'];
          SessionStore.session.accessToken = res.header['access-token'];
          sessionStorage.setItem('session', JSON.stringify(SessionStore.session));
          SessionStore.trigger(SessionStore.session);
        }
      })
  },

  getSession: function() {
    var session = JSON.parse(sessionStorage.getItem('session'));
    if (session) {
      if (session.accessToken) {
        this.session.email = session.email;
        this.session.uid = session.uid;
        this.session.provider = session.provider;
        this.session.first_name = session.first_name;
        this.session.last_name = session.last_name;
        this.session.errors = [];
        this.session.client = session.client;
        this.session.accessToken = session.accessToken;
      } else {
        this.session.email = "";
        this.session.uid = "";
        this.session.provider = "";
        this.session.first_name = "";
        this.session.last_name = "";
        this.session.errors = [];
        this.session.client = "";
        this.session.accessToken = "";
      }
    }
    this.trigger(this.session);
    return this.session;
  }
});

module.exports = SessionStore;
