var React = require('react');

var ErrorList = React.createClass({

  render: function () {
    return (
      <div className="alert alert-style-1 information-box warning-alert">
        <div className="alert-icon">
          <i className="ico-warning"></i>
        </div>
        <div className="alert-contents">
          <h6 className="alert-title">Error:</h6>
          <ul>
        {this.props.errors.map(function (error, i) {
          return (
            <li key={i}>{error}</li>
          )
        })}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = ErrorList;
