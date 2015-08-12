var React = require('react');

var Footer = React.createClass({
    render: function () {

        return (
        <footer className="main-section dark-section footer" id="footer">
          <div className="section-wrapper">
            <div className="container">
              <p className="copyrights">&copy;2015 Zoe-Doodle.com</p>
            </div>
          </div>
        </footer>

      )
            ;
    }
});

module.exports = Footer;

