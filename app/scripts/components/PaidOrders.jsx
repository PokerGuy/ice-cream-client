var React = require('react');
var ErrorList = require('./common/ErrorList.jsx');
var PaidOrderStore = require('../stores/paidOrdersStore');
var Reflux = require('reflux');
var timeago = require('timeago');

PaidOrders = React.createClass({
  mixins: [Reflux.connect(PaidOrderStore, "paidOrders")],

  componentDidMount: function () {
    this.paidOrders = PaidOrderStore.getOrders();
  },

  render: function () {
    var display = <p className="text-center">Loading... <br/> <img src="dist/images/477.gif" /></p>;
    if (this.state.paidOrders) {
      display = <Table data={this.state.paidOrders.orders} />;
      if ('errors' in this.state.paidOrders) {
        display = <ErrorList errors={this.state.paidOrders.errors}/>;
      }
    }
    return (
      <div>
        <section className="main-section dark-section order" id="welcome">
          <div className="container">
            <header className="section-header">
              <h2>Paid Orders</h2>
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

Table = React.createClass({
  componentDidMount: function () {
    PaidOrderStore.listenToOrders();
  },

  componentWillUnmount: function() {
    PaidOrderStore.stopListeningToOrders();
  },

  render: function () {
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Items</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
{this.props.data.map(function (order, i) {
  var phone = "(" + order.order.phone_number.substring(0,3) + ")" + order.order.phone_number.substring(3,6) + "-" + order.order.phone_number.substring(6,10);
  return (
    <tr key={i}>
      <td>{order.order.name}</td>
      <td>{phone}</td>
      <td>{timeago(order.order.created_at)}</td>
      <td key={i}>
      {order.order.line_items.map(function (li, index) {
        return (
          <div key={index}>
            {li.quantity} x {li.flavor}
          </div>
        )
      })}
      </td>
      <td>
        <CompleteOrder key={order.order.id} orderId={order.order.id} />
      </td>
    </tr>
  )
})}
          </tbody>
        </table>
      </div>
    )
  }
});

CompleteOrder = React.createClass({

  getInitialState: function () {
    return ({
      message: "Complete",
      disabled: false,
      btnType: "btn btn-primary"
    })
  },

  completeOrder: function (id) {
    this.setState({message: "Completing...", disabled: true, btnType: "btn btn-danger"});
    PaidOrderStore.completeOrder(id);
  },

  render: function () {
    return (
      <button className={this.state.btnType} disabled={this.state.disabled} onClick={this.completeOrder.bind(this, this.props.orderId)}>{this.state.message}</button>
    );
  }
});

module.exports = PaidOrders;
