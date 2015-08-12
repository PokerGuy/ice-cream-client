var React = require('react');
var Reflux = require('reflux');
var ErrorList = require('./common/ErrorList.jsx');
var SessionStore = require('../stores/sessionStore');
var Router = require('react-router');

LogIn = React.createClass({
  mixins: [Reflux.connect(SessionStore, "session"), Router.Navigation],

  getInitialState: function () {
    return ({
      session: {
        client: null,
        errors: []
      }
    })
  },

  _submit: function () {
    $('#submit').button('loading');
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    SessionStore.login(email, password);
  },

  render: function () {
    var errors;
    if (this.state.session.errors.length > 0) {
      $('#submit').button('reset');
      errors = <ErrorList errors={this.state.session.errors}/>;
    } else {
      errors = <div></div>;
    }
    if (this.state.session.client != null) {
      this.transitionTo('home');
    }
    return (
      <div>
        <section className="main-section dark-section order" id="welcome">
          <div className="container">
            <header className="section-header">
              <h2>Log In</h2>
              <div className="divider-section-header"></div>
            </header>
                {errors}
            <div className="order-form information-box">
              <ul className="row">
                <li className="col-md-6 form-item">
                  <label htmlFor="email">
                    <i className="ico-male"></i>
                  </label>
                  <input type="text" name="email" placeholder="Email" ref="email" />
                </li>
                <li className="col-md-6 form-item">
                  <label htmlFor="password">
                  </label>
                  <input type="password" ref="password" placeholder="Password" />
                </li>
              </ul>
              <ul className="row">
                <li className="col-md-3 form-item">&nbsp;</li>
                <li className="col-md-6 form-item">
                  <button className="btn btn-success" id="submit" onClick={this._submit} data-loading-text="Submitting...">Log In</button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

    );
  }
});


module.exports = LogIn;
