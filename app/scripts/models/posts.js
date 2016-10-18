var $ = require('jquery');
var Backbone = require('backbone');

// set up model container
var Post = Backbone.Model.extend({
  defaults :{
    "htmlText" : "Submit"
  },
  isLoading: function(){

  }
});

var PostCollection = Backbone.Collection.extend({
  model: Post,
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/posts'
});

// // instantiate a new collection
// var allPosts = new PostCollection();
//
// // backbone ajax method
// allPosts.fetch();
//
// // backbone event listener/handler
// allPosts.on('add', function(){
//   console.log('emitting add event');
// });

module.exports = {
  Post : Post,
  PostCollection: PostCollection
};
