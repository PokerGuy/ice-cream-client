var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;
var FlavorStore = require('../stores/flavorStore');

var LandingPage = React.createClass({
  mixins: [Reflux.connect(FlavorStore, "flavorList")],

  getInitialState: function () {
    return ({
      flavorList: []
    });
  },
  componentDidMount: function () {
    jQuery(".slider").owlCarousel({
      animateIn: 'owl-fadeUp-in',
      animateOut: 'owl-fadeUp-out',
      items: 1,
      margin: 0,
      loop: true,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: false,
      nav: true,
      dots: true,
      stagePadding: 0,
      smartSpeed: 1000,
      mouseDrag: true,
      touchDrag: true,
      responsive: {
        0: {
          items: 1,
          slideBy: 1
        }
      }
    });
    this.flavorList = FlavorStore.fetchList();
  },

  render: function () {
    var order = <NoInventory />
    if (this.state.flavorList.length > 0) {
      order = <LinkToOrder />
    }
    return (
      <div>
        <section className="main-section dark-section welcome" id="welcome">
          <div className="slider slider-home slider-1" id="slider">
            <div className="slide" id="slide-1">
              <img src="dist/images/zoe1.jpg" alt="slider image" className="img-slider" />
              <div className="cover"></div>
              <div className="captions">
                <h2 className="animated">Hello, Welcome To Zoe-Doodle</h2>
              </div>
            </div>
            <div className="slide" id="slide-2">
              <img src="dist/images/first.jpg" alt="slider image" className="img-slider" />
              <div className="cover"></div>
              <div className="captions">
                <h2 className="animated">Our first customers!</h2>
              </div>
            </div>
            <div className="slide" id="slide-3">
              <img src="dist/images/zoe2.jpg" alt="slider image" className="img-slider" />
              <div className="cover"></div>
              <div className="captions">
                <h2 className="animated">Over 3 Million Americans Are Living with Type I Diabetes</h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
});

NoInventory = React.createClass({
  render: function () {
    return (
      <p className="service-description">
      Sorry, we are sold out. Check back again to order ice cream,
      or please consider making a &nbsp; &nbsp; &nbsp;
        <Link to="donation">
          <button className="btn btn-success">Donation</button>
        </Link>
      </p>
    );
  }
});

LinkToOrder = React.createClass({
  render: function () {
    return (
      <p className="service-description">
      We have ice cream available! &nbsp; &nbsp; &nbsp;
        <Link to="order">
          <button className="btn btn-primary">Order</button>
        </Link>
      &nbsp; &nbsp; &nbsp;or make a &nbsp; &nbsp; &nbsp;
        <Link to="donation">
          <button className="btn btn-success">Donation</button>
        </Link>
      </p>
    );
  }
});

module.exports = LandingPage;
