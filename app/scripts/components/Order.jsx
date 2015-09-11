var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;
var FlavorStore = require('../stores/flavorStore.js');
var OrderStore = require('../stores/orderStore.js');
var NonceStore = require('../stores/nonceStore');
var request = require('superagent');
var Constants = require('../constants/constants.js');
var numeral = require('numeral');
var braintree = require('braintree-web');
var ErrorList = require('./common/ErrorList.jsx');
var CreditCardForm = require('./common/CreditCardForm.jsx');
var _ = require('underscore');

var OrderPage = React.createClass({
  mixins: [Reflux.connect(OrderStore, "order")],

  getInitialState: function () {
      return ({
        order: {status: "draft", total: 0, errors: [], lineItems: [{id: 1, flavorId: 0, flavorName: "", qty: 1, price: 0}]},
      })
  },

  componentDidMount: function() {
    var flavorId = 0;
    if (this.props.selected) {
      flavorId = this.props.selected;
    }
    OrderStore.createOrder(flavorId);
  },

  render: function () {
    var display;
    if (this.state.order.status === "draft") {
      display = <OrderForm order={this.state.order} />;
    } else if (this.state.order.status === "new") {
      display = <Confirm order={this.state.order}/>;
    } else if (this.state.order.status === "paid") {
      display = <Paid />
    }
    return (
      <div>
        <section className="main-section light-section order" id="welcome">
          <div className="container">
            <header className="section-header">
              <h2>Quality Ice Cream for a Great Cause</h2>
              <div className="divider-section-header"></div>
              <p>Please fill out the order form and we will hand deliver your ice cream. Remember, all ingredients are donated and all money collected goes to the Juvenile Diabetes Research Fund.</p>
            </header>
            <div className="col-md-8 contact-form-wrapper">
              <div className="contact-form">
                  {display}
              </div>
            </div>
            <div className="col-md-4 contact-means-wrapper">
              <div className="work-hours contact-box">
                <h5 className="contact-box-title">Privacy Policy :</h5>
                <div className="contact-box-body clearfix">
                  <i className="contact-icon ico-flag"></i>
                  <ul className="contact-details">
                    <li>Your privacy is extremely important to us.
                    A phone number is required for contact and delivery set up purposes only. A confirmation text will be sent immediately to the number provided.
                    We will follow up via text message to arrange delivery of your order.
                    It will not be shared with anyone.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
});

var Paid = React.createClass({
  render: function () {
    return (
      <div>
      Thank you!
      </div>
    );
  }
})

var OrderForm = React.createClass({
  mixins: [Reflux.connect(FlavorStore, "flavorList", "listener")],

  getInitialState: function () {
    return {
      flavorList: []
    };
  },

  componentDidMount: function () {
    this.flavorList = FlavorStore.fetchList();
    this.listener = FlavorStore.listenToFlavors();
  },

  componentWillUnmount: function () {
    FlavorStore.stopListening();
  },

  _addItem: function () {
    OrderStore.addItem();
  },

  _purchase: function () {
    OrderStore.purchase();
  },

  render: function () {
    var show = <div></div>;
    if (this.state.flavorList.length > 0) {
      show = <MapHeader lineItems={this.props.order.lineItems}  />;
    }
    return (
      <div>
    {show}
        <ul className="row">
          <li className="col-md-6">
          <strong>Total:</strong>
          </li>
          <li className="col-md-6 text-right">
                        <strong>{numeral(this.props.order.total).format('$0,0.00')}</strong>
          </li>
        </ul>
        <ul className = "row">
          <li className="col-md-6 form-item">
            <button className="btn btn-primary" onClick={this._addItem}>Add a Flavor</button>
          </li>
          <li className = "col-md-6 form-item">
            <button className="btn btn-success" onClick={this._purchase}>Purchase</button>
          </li>
        </ul>
      </div>
    );
  }
});

var MapHeader = React.createClass({
  render: function () {
    return (
      <div>
          {this.props.lineItems.map(function (lineItem, i) {
            return (
              <LineItemHeader key={lineItem.id} details={lineItem} count={i + 1} key={i}/>
            );
          })}
      </div>
    );
  }
});

var Confirm = React.createClass({
  mixins: [Reflux.connect(NonceStore, "nonce")],

  getInitialState: function () {
    return {
      nonce: null,
      phone: "",
      phoneLength: 0,
      btnText: "Complete",
      btnStyle: "btn btn-success",
      disabled: false
    };
  },

  componentDidMount: function () {
    this.nonce = NonceStore.getNonce();
  },

  _cancel: function () {
    OrderStore.cancel();
  },

  _formatPhone: function (e) {
    var pos = this.refs.phone.getDOMNode().value.length;
    //the user is moving forward
    if (pos > this.state.phoneLength && (pos == 3)) {
      this.setState({phone: "(" + e.target.value + ")", phoneLength: this.state.phoneLength + 3});
    } else if (pos > this.state.phoneLength && (pos == 8)) {
      this.setState({phone: e.target.value + "-", phoneLength: this.state.phoneLength + 2});
    } else if (pos > this.state.phoneLength && (pos == 9) && (this.state.phone.substring(7, 8) != "-")) {
      this.setState({
        phone: this.state.phone + "-" + e.target.value.substring(8, 9), phoneLength: this.state.phoneLength + 2
      });
    } else if (pos > this.state.phoneLength && (pos == 4) && (this.state.phone.substring(3, 4) != ")")) {
      this.setState({
        phone: "(" + e.target.value.substring(0, 3) + ")" + e.target.value.substring(3, 4),
        phoneLength: this.state.phoneLength + 3
      });
    } else if (pos > this.state.phoneLength) {
      this.setState({phone: e.target.value, phoneLength: this.state.phoneLength + 1});
      //the user is moving backward
    } else if (pos < this.state.phoneLength && (pos == 4)) {
      this.setState({phone: e.target.value.substring(1, 4), phoneLength: this.state.phoneLength - 2});
    } else {
      this.setState({phone: e.target.value, phoneLength: this.state.phoneLength - 1});
    }
  },

  _complete: function () {
    this.setState({btnText: "Completing...", btnStyle: "btn btn-default", disabled: true});
    var sendPhone = this.refs.phone.getDOMNode().value.substring(1, 4) + this.refs.phone.getDOMNode().value.substring(5, 8) + this.refs.phone.getDOMNode().value.substring(9, 13);
    var client = new braintree.api.Client({clientToken: this.state.nonce.nonce});
    OrderStore.setName(this.refs.name.getDOMNode().value);
    OrderStore.setPhone(sendPhone);
    client.tokenizeCard({
      number: this.state.nonce.ccNumber,
      expirationMonth: this.state.nonce.expMo,
      expirationYear: this.state.nonce.expYr
    }, function (err, nonce) {
      OrderStore.complete(nonce);
    });
  },

  componentWillReceiveProps: function (nextprops) {
    if (nextprops.order.errors.length > 0) {
      this.setState({btnStyle: "btn btn-success", disabled: false, btnText: "Complete"});
    }
  },

  render: function () {
    var errors;
    if (this.props.order.errors.length > 0) {
      errors = <ErrorList errors={this.props.order.errors}/>;
    } else {
      errors = <div></div>;
    }
    return (
      <div>
        {errors}
        <p>Thank you for your order. Please confirm your choices, provide your contact information, and payment details.</p>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Line Item</th>
                <th>Flavor</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Sub-Total</th>
              </tr>
            </thead>
            <tbody>
        {this.props.order.lineItems.map(function (lineItem, i) {
          return (
            <ConfirmTableRow key={i} lineItem={lineItem} count={i + 1}/>
          )
        })}
            </tbody>
          </table>
        </div>
      Your total is {numeral(this.props.order.total).format('$0,0.00')}
        <ul className="row">
          <li className="col-md-6 form-item">
            <label htmlFor="name">
              <i className="ico-male"></i>
            </label>
            <input type="text" name="name" id="name" placeholder="Name" ref="name" />
          </li>
          <li className="col-md-6 form-item">
            <label htmlFor="phone">
              <i className="ico-iphone"></i>
            </label>
            <input type="tel" ref="phone" id="phone" placeholder="Ten Digit Phone Number" onChange={this._formatPhone} value={this.state.phone} />
          </li>
        </ul>
        <CreditCardForm/>
        <ul className="row">
          <li className="col-md-6 form-item">
            <button className="btn btn-danger" onClick={this._cancel}>Cancel</button>
          </li>
          <li className="col-md-6 form-item">
            <button className={this.state.btnStyle} disabled={this.state.disabled} onClick={this._complete}>{this.state.btnText}</button>
          </li>
        </ul>
      </div>
    );
  }
});

var ConfirmTableRow = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.count}</td>
        <td>{this.props.lineItem.flavorName}</td>
        <td>{this.props.lineItem.qty}</td>
        <td>{numeral(this.props.lineItem.price).format('$0,0.00')}</td>
        <td>{numeral(this.props.lineItem.price * this.props.lineItem.qty).format('$0,0.00')}</td>
      </tr>
    )
  }
})

var LineItemHeader = React.createClass({
  _deleteItem: function () {
    OrderStore.deleteItem(this.props.details.id)
  },
  render: function () {
    return (
      <div className="box">
        <div className='panel panel-default'>
          <ul className='row'>
            <li className="col-md-12 form-item">
              <div className='btn-toolbar pull-right'>
                <div className='btn-group'>
                  <button type='button' className='btn btn-xs btn-danger' onClick={this._deleteItem}>
                  Remove
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <ul className="row">
            <li className="col-md-12 form-item">
              <div className="more-products">Ice Cream &#35; {this.props.count} </div>
            </li>
          </ul>
          <SelectOrQuantity key={this.props.details.id} details={this.props.details} flavorList={this.props.flavorList}/>
        </div>
      </div>
    );
  }
});

var SelectOrQuantity = React.createClass({

  _pickedFlavor: function () {
    OrderStore.pickFlavor(this.props.details.id, this.refs.flavorSelect.getDOMNode().value);
  },

  render: function () {
    var flavorList = FlavorStore.flavorList;
    if (this.props.details.flavorId === 0) {
      return (
        <ul className='row'>
          <ul className="col-md-12 form-item">
            <select onChange={this._pickedFlavor} ref="flavorSelect">
              <option defaultValue>Choose a flavor</option>
        {flavorList.map(function (flavor, i) {
          return (
            <option value={flavor.id + ":" + flavor.name + ":" + flavor.price} key={i}>{flavor.name}</option>
          )
        })}
            </select>
          </ul>
        </ul>
      );
    } else {
      return (
        <ChooseQuantity details={this.props.details} />
      )
    }
  }
});

var ChooseQuantity = React.createClass({

  _updateQty: function () {
    OrderStore.updateQuantity(this.props.details.id, this.refs.qty.getDOMNode().value);
    this.setState({subTotal: this.refs.qty.getDOMNode().value * this.state.flavorDetails.price});
  },

  getInitialState: function() {
    return({
      flavorDetails: {},
      subTotal: 0
    })
  },

  componentDidMount: function() {
    var searchFlav = parseInt(this.props.details.flavorId);
    var details = _.find(FlavorStore.flavorList, function (flavor) {
      return flavor.id == searchFlav
    });
    this.setState({flavorDetails: details});
    if (this.props.details.price != details.price) {
      OrderStore.preSelected(this.props.details.id, details.price, details.name);
    }
    this.setState({subTotal: details.price});
  },
  render: function () {
    var details = this.props.details;
    var warning;
    if (this.props.details.qty > this.state.flavorDetails.stock_quantity && this.state.flavorDetails.stock_quantity > 0) {
      warning = <QtyError attempted={this.props.details.qty} available={this.state.flavorDetails.stock_quantity} name={this.state.flavorDetails.name} />;
    } else if (this.state.flavorDetails.stock_quantity == 0) {
      warning = <OutOfStockError/>
    } else {
      warning = <div></div>;
    }
    return (
      <div>
        <div className='text-center'>
          <h2>{this.state.flavorDetails.name}</h2>
        </div>
        <ul clasName='row'>
          <div className='col-md-12 form-item' dangerouslySetInnerHTML={{__html: this.state.flavorDetails.description}} />
        </ul>
        <ul className='row'>
          <div className='col-md-12 form-item'>
          &nbsp;
          </div>
        </ul>
        <ul className='row'>
          <div className='col-md-12 form-item'>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#ingredients">Ingredients (click here to display)</a>
                </h4>
              </div>
              <div id="ingredients" className="panel-collapse collapse">
                <div className="panel-body">
                  <div className='col-md-12 form-item' dangerouslySetInnerHTML={{__html: this.state.flavorDetails.ingredients}} />
                </div>
              </div>
            </div>
          </div>
        </ul>
        <div>
        {warning}
        </div>
        <ul className='row'>
          <li className='col-md-6 form-item'>
            <label htmlFor='qty'>Quantity:</label>
          </li>
          <li className='col-md-6 form-item'>
            <input type="tel" defaultValue={this.props.details.qty} id='qty' ref='qty' onChange={this._updateQty}/>
          </li>
        </ul>
        <ul className='row'>
          <li className='col-md-6 form-item'>
            <label htmlFor='availQty'>Available Quantity:</label>
          </li>
          <li className='col-md-6 form-item'>
            <div id='availQty' className='text-right'>{this.state.flavorDetails.stock_quantity}</div>
          </li>
        </ul>
        <ul className='row'>
          <li className='col-md-6 form-item'>
            <label htmlFor='price'>Unit Price:</label>
          </li>
          <li className='col-md-6 form-item'>
            <div id='price' className='text-right'>{numeral(this.state.flavorDetails.price).format('$0,0.00')}</div>
          </li>
        </ul>
        <ul className='row'>
          <li className='col-md-6 form-item'>
            <label htmlFor='total'>Sub-Total:</label>
          </li>
          <li className='col-md-6 form-item'>
            <div id='total' className='text-right'>{numeral(this.state.subTotal).format('$0,0.00')}</div>
          </li>
        </ul>
      </div>
    );
  }
});

QtyError = React.createClass({
  render: function () {
    return (
      <div className="alert alert-style-1 information-box warning-alert">
        <div className="alert-icon">
          <i className="ico-warning"></i>
        </div>
        <div className="alert-contents">
          <h6 className="alert-title">Warning</h6>
          <p>You are attempting to order {this.props.attempted} pints of {this.props.name}. Only {this.props.available} pints are available.</p>
        </div>
      </div>
    )
  }
});

OutOfStockError = React.createClass({
  render: function () {
    return (
      <div className="alert alert-style-1 information-box warning-alert">
        <div className="alert-icon">
          <i className="ico-warning"></i>
        </div>
        <div className="alert-contents">
          <h6 className="alert-title">Warning</h6>
          <p>Some rat bastard snuck in and ordered the last of this flavor before you got a chance to complete your order! Please check back again soon or pick another flavor.</p>
        </div>
      </div>
    )
  }
});
module.exports = OrderPage;

