var React = require('react');
var Reflux = require('reflux');
var FlavorStore = require('../stores/flavorStore');
var numeral = require('numeral');

OurFlavors = React.createClass({
  mixins: [Reflux.connect(FlavorStore, "flavorList")],

  getInitialState: function () {
    return ({
      flavorList: null
    });
  },

  componentDidMount: function () {
    this.flavorList = FlavorStore.allFlavors();
  },

  render: function () {
    var display = <div></div>;
    if (this.state.flavorList) {
      display = <FlavTable data={this.state.flavorList} />;
    }
    return (
      <div>
        <section className="main-section dark-section order">
          <div className="container">
            <header className="section-header">
              <h2>Our Flavors</h2>
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

FlavTable = React.createClass({
  componentDidMount: function() {
    $('#columns').columns({
      data: this.props.data,
      schema: [
        {"header":"ID", "key":"id", "hide": true},
        {"header":"Name", "key":"name"},
        {"header":"Price", "key":"price", "template": '${{price}}'},
        {"header":"Description", "key":"description"},
        {"header":"Ingredients", "key":"ingredients"},
        {"header":"Availability", "key":"stock_quantity", "template": "<br/><br/>{{stock_quantity}} pints {{#available}}<br/><br/><a href=\"/#/selected/{{id}}\">&nbsp;&nbsp;<button class=\"btn btn-success\">Order Now!</button></a>&nbsp;&nbsp;{{/available}}<br/><br/>"},
        {"header":"", "key":"available", "template": "{{#available}}<img src=\"dist/images/happy.png\"/>{{/available}}{{^available}}<img src=\"dist/images/mad.png\"/>{{/available}}</style>"}
      ]
    });
  },

  render: function() {
    return (
      <div id="columns"></div>
    )
  }
/*  render: function () {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price&nbsp;&nbsp;&nbsp;&nbsp;</th>
            <th>Description</th>
            <th>Ingredients</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
{this.props.data.map(function (flavor) {
  var ico = "dist/images/happy.png";
  if (flavor.stock_quantity == 0) {
    ico = "dist/images/mad.png";
  }
  return (
    <tr key={flavor.id}>
      <td data-title="Name">{flavor.name}</td>
      <td data-title="Price">{numeral(flavor.price).format('$0,0.00')}</td>
      <td data-title="Description">
        <div dangerouslySetInnerHTML={{__html: flavor.description}} />
      </td>
      <td data-title="Ingredients">
        <div dangerouslySetInnerHTML={{__html: flavor.ingredients}} />
      </td>
      <td data-title="Availability">
        <p>{flavor.stock_quantity} pints
          <br/>
          <img src={ico}/>
        </p>
      </td>
    </tr>
  )
})}
        </tbody>
      </table>
    )
  } */
});

module.exports = OurFlavors;

