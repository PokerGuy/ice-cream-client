var Reflux = require('reflux');
var DonationActions = require('../actions/donationActions');
var Constants = require('../constants/constants');
var request = require('superagent');

var DonationStore = Reflux.createStore({
  listenables: [DonationActions],
  donation: {name: "", amount: 0, status: "new", allow: true, errors: []},
  donations: [],
  source: null,

  newDonation: function () {
    this.trigger(this.donation);
  },

  createDonation: function (nonce) {
    DonationStore.donation.errors = [];
    request.post(Constants.APIEndpoints.DONATION)
      .send({
        donation: {name: DonationStore.donation.name, amount: DonationStore.donation.amount, allow_display: DonationStore.donation.allow, nonce: nonce}
      })
      .set('Accept', 'application/json')
      .end(function (error, res) {
        if (res) {
          var json = JSON.parse(res.text);
          if (!(json.error)) {
            DonationStore.donation.status = "complete";
            DonationStore.trigger(DonationStore.donation);
          } else {
            DonationStore.donation.errors = json.error;
            DonationStore.trigger(DonationStore.donation);
          }
        }
      })
  },
  getAllDonations: function() {
    request.get(Constants.APIEndpoints.DONATION)
    .set('Accept', 'application/json')
    .end(function (error, res) {
        if (res) {
          DonationStore.donations = JSON.parse(res.text);
          DonationStore.trigger(DonationStore.donations);
        }
      })
  },
  listenToDonations: function() {
    this.source = new EventSource(Constants.Listener.Root);
    this.source.onmessage = function(event) {
      var json = JSON.parse(event.data);
      if (json.type === 'donationAdded') {
        DonationStore.donations.donations.unshift({name: json.name, amount: json.amount, created_at: json.created_at});
        DonationStore.trigger(DonationStore.donations);
      }
    }
  },
  stopListening: function() {
    this.source.close;
    this.trigger(this.source);
  },
  clearDonation: function() {
    this.donation = {name: "", amount: 0, status: "new", errors: []};
    this.trigger(this.donation);
  }
});

module.exports = DonationStore;
