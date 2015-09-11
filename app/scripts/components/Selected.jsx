var React = require('react');
var Router = require('react-router');
var Order = require('./Order.jsx');


Selected = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return ({
      flavorId: this.context.router.getCurrentParams().flavorId
    })
  },

  render: function() {
    return(
      <Order selected={this.state.flavorId} />
    );
  }
});

module.exports = Selected;

