var React = require('react');
var ErrorList = require('./common/ErrorList.jsx');
var FlavorStore = require('../stores/flavorStore');
var Reflux = require('reflux');
var numeral = require('numeral');

FlavorMaintenance = React.createClass({
  mixins: [Reflux.connect(FlavorStore, "flavorList")],

  getInitialState: function () {
    showModal: false
  },

  componentDidMount: function () {
    this.flavorList = FlavorStore.adminList();
  },

  onChildChanged: function (newState) {
    if (newState) {
      $('#newFlavor').modal('show');
      this.setState({showModal: true});
    } else {
      $('#newFlavor').modal('hide');
      this.setState({showModal: false});
    }
  },

  render: function () {
    var display = <p className="text-center">Loading...
      <br/>
      <img src="dist/images/477.gif" />
    </p>;
    if (this.state.flavorList) {
      display = <FlavorForm data={this.state.flavorList} callbackParent={this.onChildChanged} />;
      if ('errors' in this.state.flavorList && !(this.state.showModal)) {
        display = <ErrorList errors={this.state.flavorList.errors}/>;
      }
    }
    return (
      <div>
        <section className="main-section dark-section order" id="welcome">
          <div className="container">
            <header className="section-header">
              <h2>Maintain Flavors</h2>
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

FlavorForm = React.createClass({
  componentDidMount: function () {
    this.setState({flavorCount: this.props.data.length});
    FlavorStore.adminListenToFlavors();
  },

  componentWillUnmount: function () {
    FlavorStore.stopListening();
  },

  getInitialState: function () {
    return ({
      buttonStyle: "btn btn-primary",
      disabled: false,
      btnText: "Save",
      name: "",
      qty: "",
      price: "",
      flavorCount: 0
    })
  },

  showModal: function () {
    this.props.callbackParent(true);
  },

  componentWillReceiveProps: function (nextprops) {
    if (nextprops.data.length > this.state.flavorCount) {
      this.setState({
        buttonStyle: "btn btn-primary",
        disabled: false,
        btnText: "Save",
        name: "",
        qty: "",
        price: "",
        flavorCount: nextprops.data.length
      });
      this.props.callbackParent(false);
    } else {
      this.setState({buttonStyle: "btn btn-primary", disabled: false, btnText: "Save"});
    }
  },

  newFlavor: function () {
    this.setState({buttonStyle: "btn btn-default", disabled: true, btnText: "Saving..."});
    var name = this.refs.name.getDOMNode().value;
    var qty = this.refs.qty.getDOMNode().value;
    var price = this.refs.price.getDOMNode().value;
    FlavorStore.createFlavor(name, qty, price);
  },

  changeName: function (e) {
    this.setState({name: e.target.value});
  },

  changeQty: function (e) {
    this.setState({qty: e.target.value});
  },

  changePrice: function (e) {
    this.setState({price: e.target.value});
  },

  render: function () {
    var display = <div></div>;
    if ('errors' in this.props.data) {
      display = <ErrorList errors={this.props.data.errors}/>;
    }
    return (
      <div>
        <ul className="row">
          <div className="col-md-6 form-item">
          Name
          </div>
          <div className="col-md-2 form-item">
          Price
          </div>
          <div className="col-md-2 form-item">
          Avail Qty
          </div>
          <div className="col-md-2 form-item">
          &nbsp;
          </div>
        </ul>
{this.props.data.map(function (flavor, i) {
  return (
    <FlavorRow key={flavor.id} flavor={flavor} />
  )
})}
        <div className="col-md-4 form-item">
        &nbsp;
        </div>
        <div className="col-md-4 form-item">
          <button className="btn btn-primary" onClick={this.showModal}>Add Flavor</button>
        </div>
        <div className="col-md-4 form-item">
        &nbsp;
        </div>
        <br/>
        <br/>

        <div className="modal fade" id="newFlavor" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">Add a Flavor</h4>
              </div>
              <div className="modal-body">
              {display}
                <ul className="row">
                  <li>
                    <label htmlFor="name">
                    Flavor Name:
                    </label>
                    <input type="text" name="name" id="name" ref="name" value={this.state.name} onChange={this.changeName}/>
                  </li>
                </ul>
                <ul className="row">
                  <li>
                    <label htmlFor="qty">
                    Avail Quantity:
                    </label>
                    <input type="text" name="qty" id="qty" ref="qty" value={this.state.qty} onChange={this.changeQty} />
                  </li>
                </ul>
                <ul className="row">
                  <li>
                    <label htmlFor="price">
                    Price:
                    </label>
                    <input type="text" name="price" id="price" ref="price" value={this.state.price} onChange={this.changePrice}/>
                  </li>
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                <button type="button" className={this.state.buttonStyle} disabled={this.state.disabled} onClick={this.newFlavor}>{this.state.btnText}</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
});

FlavorRow = React.createClass({
  getInitialState: function () {
    return ({
      id: this.props.flavor.id,
      btnText: "Update",
      btnStyle: "btn btn-success",
      disabled: false,
      show: false,
      name: "",
      qty: 0
    })
  },

  componentWillReceiveProps: function (nextprops) {
    if (this.state.name != nextprops.flavor.name || this.state.qty != nextprops.flavor.stock_quantity) {
      if (nextprops.flavor.name) {
        this.setState({
          name: nextprops.flavor.name
        });
        if (nextprops.flavor.stock_quantity) {
          this.setState({
            qty: nextprops.flavor.stock_quantity
          })
        }
      }
      if (this.state.name != "") {
        $.growl({
          title: this.state.name,
          message: "Modified by another user.",
          style: "notice",
          size: "large",
          location: "tc"
        });
      }
    }
  },

  update: function () {
    FlavorStore.updateFlavor(this.state.id, this.refs.name.getDOMNode().value, this.refs.qty.getDOMNode().value);
  },

  showButton: function () {
    this.setState({show: true});
  },

  hideButton: function () {
    this.setState({show: false});
  },

  changeName: function (e) {
    this.setState({name: e.target.value});
  },

  changeQty: function (e) {
    this.setState({qty: e.target.value});
  },

  render: function () {
    var button = <div></div>;
    if (this.state.show) {
      button = <button className={this.state.btnStyle} disabled={this.state.disabled} onMouseDown={this.update}>{this.state.btnText}</button>;
    }
    return (
      <ul className="row">
        <div className="col-md-6 form-item">
          <input type="text" ref="name" value={this.state.name} onChange={this.changeName} onFocus={this.showButton} onBlur={this.hideButton}/>
        </div>
        <div className="col-md-2 form-item">
      {numeral(this.props.flavor.price).format('$0,0.00')}
        </div>
        <div className="col-md-2 form-item">
          <input type="text" value={this.state.qty} onChange={this.changeQty} ref="qty" onFocus={this.showButton} onBlur={this.hideButton}/>
        </div>
        <div className="col-md-2 form-item">
        {button}
        </div>
      </ul>
    )
  }
});

module.exports = FlavorMaintenance;
