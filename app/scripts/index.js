var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Handlebars = require('handlebars');

// templates
var postTemplate = require('../templates/post.hbs');
var formTemplate = require('../templates/form.hbs');

var models = require('./models/posts');

//DOM ready
(function($){
  // INITIAL Requirements:
  // get the submit/loading button
  // when clicked, launch an backbone ajax request (fetch())
  // disable the button, change button text to 'Loading...'
  // when ajax is done, change the text back to orignal text

  // instantiate a new collection
  var allPosts = new models.PostCollection();
  var $app = $('.app');
  var $posts = $('<ul class="posts"></ul>');
  $app.html($posts);

  $('#fetch-posts').on('click', function(){
    var $this = $(this);

    // check if the collection is larger than whats onscreen
    if($posts.length > allPosts.length){
      // backbone fecth (ajax method, push to call stack)
      allPosts.fetch().then(function(){
        // make button available again
        $this.text('Gimme Posts!');
        $this.prop('disabled', false);
        $app.append(formTemplate());
      });
      // disable the button while we wait
      $this.text('Loading...');
      $this.prop('disabled', true);
    }

  });

  // backbone event listener/handler
  allPosts.on('add', function(post){
    if(allPosts.length > $posts.length){
      console.log('emitting add event');
      var context = {
        title : post.get('title'),
        body : post.get('body'),
        id: post.get('_id')
      };
      $posts.append(postTemplate(context));
    }
  });

  // ADDITIONAL STUFF:
  // Create a form that adds to collection
  // Save the new collection items to the API endpoint
  // Add a delete button that removes it from collection
  //   and endpoint
  // drop list for displaying 5, 10 ,15, 20 ect
  // *form filter search bar

  $app.on('submit', '#post-submit', function(e){
    e.preventDefault();
    if($('#post-submit input').val() !== ''){
      allPosts.create({
        title: $('input[name="title"]').val(),
        body: $('textarea[name="body"]').val()
      });
    }
  });

  $app.on('click', '.js-remove-post', function(){
    var postId = $(this).parents('.post').data('id');
    var postToRemove = allPosts.findWhere({'_id' : postId});
    var getPost = allPosts.get(postToRemove);
    getPost.destroy({
      wait: true
    });
  });

  allPosts.on('destroy', function(post){
    console.log('destroying: ', post);
  });


}(jQuery));
