var React = require('react');
var Reflux = require('reflux');
var NonceStore = require('../../stores/nonceStore');

var CreditCardForm = React.createClass({
  mixins: [Reflux.connect(NonceStore, "nonce")],

  getInitialState: function () {
    return ({
      ccNumber: "",
      ccLength: 0
    });
  },

  componentDidMount: function() {
    NonceStore.nonce.expMo = this.refs.expMo.getDOMNode().value;
    NonceStore.nonce.expYr = this.refs.expYr.getDOMNode().value;
  },

  _formatCreditCardNumber: function (e) {
    var pos = this.refs.ccNumber.getDOMNode().value.length;
    if (pos > this.state.ccLength && ((pos == 4) || (pos == 9) || (pos == 14))) {
      this.setState({ccNumber: e.target.value + " ", ccLength: this.state.ccLength + 1});
    } else if (pos > this.state.ccLength) {
      this.setState({ccNumber: e.target.value, ccLength: this.state.ccLength + 1});
    } else {
      this.setState({ccNumber: e.target.value, ccLength: this.state.ccLength - 1});
    }
    NonceStore.nonce.ccNumber = e.target.value;
  },

  setMo: function() {
    NonceStore.nonce.expMo = this.refs.expMo.getDOMNode().value;
  },

  setYr: function() {
    NonceStore.nonce.expYr = this.refs.expYr.getDOMNode().value;
  },

  render: function () {
    var months = [];
    var years = [];
    for (i = 1; i <= 12; i++) {
      months.push(i);
    }
    var currentTime = new Date();
    var currentYear = currentTime.getFullYear();
    for (i = currentYear; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return (
      <div>
        <ul className="row">
          <li className="col-md-12 form-item">
            <input type="tel" ref="ccNumber" placeholder="Credit Card Number" onChange={this._formatCreditCardNumber} value={this.state.ccNumber} />
          </li>
        </ul>
        <br/>
        <ul className="row">
          <li className="col-md-3 form-item">
            <label htmlFor="expMo">Expiration Month:</label>
          </li>
          <li className="col-md-3 form-item">
            <select ref="expMo" id="expMo" onchange={this.setMo}>
              <ExpMonth months={months}/>
            </select>
          </li>
          <li className="col-md-3 form-item">
            <label htmlFor="expYr">Expiration Year:</label>
          </li>
          <li className="col-md-3 form-item">
            <select ref="expYr" id="expYr" onChange={this.setYr}>
              <ExpYear years={years}/>
            </select>
          </li>
        </ul>
      </div>
    );
  }
});

var ExpMonth = React.createClass({
  render: function () {
    return (
      <div>
          {this.props.months.map(function (month, i) {
            return (
              <option value={month} key={i}>{month}</option>
            )
          })}
      </div>
    );
  }
});

var ExpYear = React.createClass({
  render: function () {
    return (
      <div>
          {this.props.years.map(function (year, i) {
            return (
              <option value={year} key={i}>{year}</option>
            )
          })}
      </div>
    );
  }
});

module.exports = CreditCardForm;
