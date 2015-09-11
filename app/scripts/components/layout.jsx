var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Header = require('./Header.react.jsx');
var Footer = require('./Footer.react.jsx');

var Layout = React.createClass({

    render: function () {
      return (
        <div className="App">
          <Header />
          <RouteHandler />
          <Footer />
        </div>
      );
    }
  });

module.exports = Layout;
