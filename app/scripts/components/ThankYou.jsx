var React = require('react');
var HallOfFame = require('./HallOfFame.jsx');
var DonationStore = require('../stores/donationStore.js');

ThankYou = React.createClass({
  componentDidMount: function() {
    $.growl({ title: "Thank you!", message: "Your generous donation is greatly appreciated", style: "notice", size: "large", location: "tc" });
  },

  render: function() {
    return(
      <HallOfFame />
    );
  }
});

module.exports = ThankYou;

