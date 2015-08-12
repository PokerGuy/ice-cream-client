var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Layout = require('./components/layout.jsx');
var Home = require('./components/Landing.react.jsx');
var OrderPage = require('./components/Order.jsx');
var HerStory = require('./components/HerStory.jsx');
var Donation = require('./components/Donation.jsx');
var HallOfFame= require('./components/HallOfFame.jsx');
var ThankYou = require('./components/ThankYou.jsx');
var LogIn = require('./components/LogIn.jsx');
var PaidOrders = require('./components/PaidOrders.jsx');
var FlavorMaintenance = require('./components/FlavorMaintenance.jsx');
var Blog = require('./components/Blog.jsx');

var routes = (
  <Route name="layout" path="/" handler={Layout}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="order" path="/order" handler={OrderPage} />
    <Route name="her-story" path="/her-story" handler={HerStory} />
    <Route name="donation" path="/donation" handler={Donation} />
    <Route name="hall-of-fame" path="/hall-of-fame" handler={HallOfFame} />
    <Route name="thank-you" path="/thank-you" handler={ThankYou} />
    <Route name="login" path="/login" handler={LogIn} />
    <Route name="paid-orders" path="/paid" handler={PaidOrders} />
    <Route name="flavor-maintenance" path="/flavor-maintenance" handler={FlavorMaintenance} />
    <Route name="blog" path="/blog/:blogId" handler={Blog} />
  </Route>
);

exports.start = function () {

  Router.run(routes, function (Handler) {
    React.render(<Handler />, document.getElementById('application'));
  });
}
