var React = require('react');
var Reflux = require('reflux');
var DonationStore = require('../stores/donationStore');
var numeral = require('numeral');
var timeago = require('timeago');

HallOfFame = React.createClass({
  mixins: [Reflux.connect(DonationStore, "donations")],

  getInitialState: function () {
    return ({
      donations: null
    });
  },

  componentDidMount: function () {
    this.donations = DonationStore.getAllDonations();
    DonationStore.listenToDonations();
  },

  componentWillUnmount: function() {
    DonationStore.clearDonation();
    DonationStore.stopListening();
  },

  render: function () {
    var display = <div></div>;
    if (this.state.donations) {
      display = <HoFTable data={this.state.donations.donations} />;
    }
    return (
      <div>
        <section className="main-section dark-section order" id="welcome">
          <div className="container">
            <header className="section-header">
              <h2>Donation Hall Of Fame</h2>
              <div className="divider-section-header"></div>
            </header>
            <div className="col-md-12 contact-form-wrapper">
              <div className="order-form information-box">
            {display}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
});

HoFTable = React.createClass({
  render: function () {
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
{this.props.data.map(function (donation, i) {
  return (
    <tr key={i}>
      <td>{donation.name}</td>
      <td>{numeral(donation.amount).format('$0,0.00')}</td>
      <td>{timeago(donation.created_at)}</td>
    </tr>
  )
})}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = HallOfFame;

