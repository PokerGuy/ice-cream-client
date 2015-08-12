var Reflux = require('reflux');

var DonationActions = Reflux.createActions([
  'newDonation',
  'createDonation',
  'getAllDonations',
  'listenToDonations',
  'stopListening',
  'clearDonation'
]);

module.exports = DonationActions;
