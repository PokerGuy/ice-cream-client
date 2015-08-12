var React = require('react');
var ErrorList = require('./common/ErrorList.jsx');
var DonationStore = require('../stores/donationStore');
var NonceStore = require('../stores/nonceStore');
var CreditCardForm = require('./common/CreditCardForm.jsx');
var Reflux = require('reflux');
var braintree = require('braintree-web');
var Router = require('react-router');

Donation = React.createClass({
  mixins: [Reflux.connect(DonationStore, "donation"), Router.Navigation],

  getInitialState: function () {
    return ({
      donation: null
    });
  },

  componentDidMount: function () {
    this.donation = DonationStore.newDonation();
  },

  render: function () {
    var display = <div></div>;
    if (this.state.donation) {
      if (this.state.donation.status === "complete") {
        this.transitionTo('thank-you');
      } else {
        display = <DonationForm donation={this.state.donation}/>
      }
    }

    return (
      <div>
        <section className="main-section dark-section order" id="welcome">
          <div className="container">
            <header className="section-header">
              <h2>Make a Donation</h2>
              <div className="divider-section-header"></div>
              <p>Although not nearly as fun as getting ice cream, every dollar is going straight to the Juvenile Diabetes
              Research Fund. Feel confident that you are helping to prolong the life and quality of life of over one million
              Americans living with Type I diabetes.</p>
            </header>
            <div className="col-md-12 contact-form-wrapper">
            {display}
            </div>
          </div>
        </section>
      </div>
    );
  }
});

Complete = React.createClass({
  render: function () {
    return (
      <div>
        <p>Thank you for making a difference!</p>
      </div>
    )
  }
});

DonationForm = React.createClass({
  mixins: [Reflux.connect(NonceStore, "nonce")],

  getInitialState: function () {
    return ({
      buttonStyle: "btn btn-success",
      disabled: false,
      btnText: "Make a Difference!",
      allow: true
    })
  },

  componentDidMount: function () {
    NonceStore.getNonce();
  },

  _submit: function () {
    this.setState({buttonStyle: "btn btn-default", disabled: true, btnText: "Submitting..."});
    DonationStore.donation.name = this.refs.name.getDOMNode().value;
    DonationStore.donation.amount = this.refs.amount.getDOMNode().value;
    DonationStore.donation.allow = this.state.allow;
    var client = new braintree.api.Client({clientToken: this.state.nonce.nonce});
    client.tokenizeCard({
      number: this.state.nonce.ccNumber,
      expirationMonth: this.state.nonce.expMo,
      expirationYear: this.state.nonce.expYr
    }, function (err, nonce) {
      DonationStore.createDonation(nonce);
    });
  },

  componentWillReceiveProps: function (nextprops) {
    if (nextprops.donation.errors) {
      this.setState({buttonStyle: "btn btn-success", disabled: false, btnText: "Make a Difference!"});
    }
  },

  toggleCheck: function() {
    if (this.state.allow) {
      this.setState({allow: false});
    } else {
      this.setState({allow: true});
    }
  },

  render: function () {
    var errors;
    var txtLabel;
    if (this.state.allow) {
      txtLabel = "I am proud to donate to the Juvenile Diabetes Research Fund. Feel free to display my name in the Hall of Fame.";
    } else {
      txtLabel = "I know I am awesome, but feel uncomfortable telling the world about it. Please credit my generous donation to Anonymous.";
    }
    if (this.props.donation.errors.length > 0) {
      $('#submit').button('reset');
      errors = <ErrorList errors={this.props.donation.errors}/>;
    } else {
      errors = <div></div>;
    }
    return (
      <div className="order-form information-box">
              {errors}
        <ul className="row">
          <li className="col-md-6 form-item">
            <label htmlFor="name">
              <i className="ico-male"></i>
            </label>
            <input type="text" name="name" id="name" placeholder="Name" ref="name" />
          </li>
          <li className="col-md-6 form-item">
            <label htmlFor="amount">$
            </label>
            <input type="tel" ref="amount" id="amount" placeholder="Donation Amount" />
          </li>
        </ul>
        <ul className="row">
          <li className="col-md-12 form-item">
          <div className="checkbox checkbox-default">
            <input id="allow" type="checkbox" checked={this.state.allow} onChange={this.toggleCheck} />
              <label htmlFor="allow">
              {txtLabel}
              </label>
            </div>
            </li>
        </ul>
        <br/>
        <br/>
        <br/>
        <br/>
        <CreditCardForm />
        <ul className="row">
          <li className="col-md-3 form-item">&nbsp;</li>
          <li className="col-md-6 form-item">
            <button className={this.state.buttonStyle} disabled={this.state.disabled} onClick={this._submit}>{this.state.btnText}</button>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = Donation;
