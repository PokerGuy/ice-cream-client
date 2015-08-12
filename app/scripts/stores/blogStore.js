var Reflux = require('reflux');
var BlogActions = require('../actions/blogActions');
var Constants = require('../constants/constants');
var request = require('superagent');

var BlogStore = Reflux.createStore({
  listenables: [BlogActions],
  blogs: [{blogs: [], blog: {}}],

  getTitles: function() {
    request.get(Constants.APIEndpoints.BLOG)
    .set('Accept', 'application/json')
    .end(function (error, res) {
        if (res) {
          var json = JSON.parse(res.text);
          BlogStore.blogs.blogs = json.blogs;
          BlogStore.trigger(BlogStore.blogs);
        }
      })
  },

  getBlog: function(id) {
    request.get(Constants.APIEndpoints.BLOG + "/" + id)
      .set('Accept', 'application/json')
      .end(function (error, res) {
        if (res) {
          var json = JSON.parse(res.text);
          BlogStore.blogs.blog = json.blog;
          BlogStore.trigger(BlogStore.blogs);
        }
      })
  }
});

module.exports = BlogStore;
