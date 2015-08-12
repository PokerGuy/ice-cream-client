var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var BlogStore = require('../stores/blogStore');
var timeago = require('timeago');

Blog = React.createClass({
  mixins: [Reflux.connect(BlogStore, "blogs")],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return ({
      blogId: this.context.router.getCurrentParams().blogId,
      blogs: {blog: null}
    });
  },

  componentDidMount: function () {
    this.blogs = BlogStore.getBlog(this.state.blogId);
  },

  render: function () {
    if (this.state.blogs.blog) {
      return (
        <div>
          <section className="main-section light-section order" id="blog">
            <div className="section-wrapper">
              <div className="container">
                <header className="section-header">
                  <h2>{this.state.blogs.blog.title}</h2>
                  <div className="divider-section-header"></div>
                </header>
                <div className="row carousel-blocks">
                  <div className="col-md-12">
                    <article className="post-wrapper sinlge-post">
                      <div className="post post-style-3">
                        <div className="post-perview">
                          <img src={this.state.blogs.blog.image} alt="Cakes" />
                          <span className="cover"></span>
                        </div>
                        <div className="post-contents">
                          <p className="post-description">
                            <div dangerouslySetInnerHTML={{__html: this.state.blogs.blog.body}} />
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
});

module.exports = Blog;
