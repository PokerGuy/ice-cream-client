var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var LandingPage = React.createClass({
  render: function () {
    return (
      <div className="slider slider-home slider-1" id="slider">
        <div className="slide" id="slide-1">
          <img src="http://placehold.it/1366x658" alt="slider image" className="img-slider" />
          <div className="cover"></div>
          <div className="captions">
            <h2 className="animated">Hello,
              <br />
            Welcome To Lollipop</h2>
            <p className="animated">Lorem Ipsum is simply dummy of the printing and typesetting 's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
          </div>
        </div>
        <div className="slide" id="slide-2">
          <img src="http://placehold.it/1366x658" alt="slider image" className="img-slider" />
          <div className="cover"></div>
          <div className="captions">
            <h2 className="animated">Welcome To Lollipop,
              <br />
            Awesome Sweets &amp; Cakes Template</h2>
            <p className="animated">Lorem Ipsum is simply dummy of the printing and typesetting 's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
          </div>
        </div>
        <div className="slide" id="slide-3">
          <img src="http://placehold.it/1366x658" alt="slider image" className="img-slider" />
          <div className="cover"></div>
          <div className="captions">
            <h2 className="animated">Hello,
              <br />
            Welcome To Lollipop</h2>
            <span className="animated">Awesome &amp; Unique PSD Template For Sweet, Cakes and Bakery Shops</span>
          </div>
        </div>
        <div className="slide" id="slide-4">
          <img src="http://placehold.it/1366x658" alt="slider image" className="img-slider" />
          <div className="cover"></div>
          <div className="captions">
            <h2 className="animated">Lollipop,
              <br />
            Awesome Sweets &amp; Cakes Template</h2>
            <p className="animated">Lorem Ipsum is simply dummy of the printing and typesetting 's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
          </div>
        </div>
        <div className="slide" id="slide-5">
          <img src="http://placehold.it/1366x658" alt="slider image" className="img-slider" />
          <div className="cover"></div>
          <div className="captions">
            <h2 className="animated">Hello,
              <br />
            Welcome To Lollipop</h2>
            <p className="animated">Lorem Ipsum is simply dummy of the printing and typesetting 's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LandingPage;
