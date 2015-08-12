var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;
var SessionStore = require('../stores/sessionStore');
var BlogStore = require('../stores/blogStore');
var FlavorStore = require('../stores/flavorStore');


var Header = React.createClass({
      mixins: [Reflux.connect(SessionStore, "session"), Reflux.connect(BlogStore, "blogs"), Reflux.connect(FlavorStore, "flavorList")],

      getInitialState: function () {
        return (
        {
          session: {},
          blogs: {blogs: [], blog: {}},
          flavorList: []
        });
      },

      componentDidMount: function () {
        this.session = SessionStore.getSession();
        this.blogs = BlogStore.getTitles();
        this.flavorList = FlavorStore.fetchList();
      },

      render: function () {
        var blogs = <div></div>;
        if (this.state.blogs.blogs.length >= 1) {
          blogs = <BlogHeader blogs={this.state.blogs.blogs} />
        }
        var login;
        if (this.state.session.accessToken != "" && this.state.session.accessToken != undefined) {
          login = <LoggedIn name={this.state.session.first_name}/>
        } else {
          login = <LogIn/>
        }
        var order = " ";
        if (this.state.flavorList.length > 0) {
          order = <li><Link to="order">Order Now</Link></li>;
        }
        return (
          <header className="header header-5" id="header">
            <div className="container">
              <ul className="top-contacts clearfix">
                <li>Quality Ice Cream for a Great Cause
                </li>
              </ul>
              <nav className="main-nav">
                <div className="clearfix">
                  <ul className="nav-links">
                {login}
                  {order}
                    <li>
                      <Link to="her-story">
                      Her Story
                      </Link>
                    </li>
                    <li>
                      <Link to="donation">Donations
                        <i className="fa fa-angle-down"></i>
                      </Link>
                      <ul className="dropdown">
                        <li>
                          <Link to="donation">Make a Donation</Link>
                        </li>
                        <li>
                          <Link to="hall-of-fame">Hall of Fame</Link>
                        </li>
                      </ul>
                    </li>
                  {blogs}
                  </ul>
                </div>
                <div className="responsive-menu-wrapper" id="responsive-menu-wrapper">
                  <a href="#" className="general-link responsive-main-nav-toggler dark" id="responsive-main-nav-toggler">
                    <i className="fa fa-bars"></i>
                  </a>
                  <div className="clearfix"></div>
                  <div className="responsive-main-nav"></div>
                </div>
              </nav>
              <div className = "logo-wrappper logo-style-1" >
                <Link to="layout">
                  <span className="top-icon">
                    <img src="dist/images/Pink-Ice-Cream-%20Cone-32.png" />
                  </span>
                  <span className="lolli">Zo&#235;</span>
                </Link>
              </div >
            </div>
          </header>
        );
      }
    }
  )
  ;

var LoggedIn = React.createClass({

  render: function () {
    return (
      <li>
        <a href="#">Welcome, {this.props.name}
          <i className="fa fa-angle-down"></i>
        </a>
        <ul className="dropdown">
          <li>
            <Link to="paid-orders">Paid Orders</Link>
          </li>
          <li>
            <Link to="flavor-maintenance">Maintain Flavors</Link>
          </li>
        </ul>
      </li>
    );
  }
});

var BlogHeader = React.createClass({

  render: function () {
    return (
      <li>
        <a href="#">Blogs
          <i className="fa fa-angle-down"></i>
        </a>
        <ul className="dropdown">
        {this.props.blogs.map(function (blog, i) {
          return (
            <li key={i}>
              <Link to="blog" params={{blogId: blog.id}}>{blog.title}</Link>
            </li>
          )
        })}
        </ul>
      </li>
    );
  }
})

var LogIn = React.createClass({

  render: function () {
    return (
      <li>
        <Link to="login">Log In</Link>
      </li>
    )
  }
});

module.exports = Header;

