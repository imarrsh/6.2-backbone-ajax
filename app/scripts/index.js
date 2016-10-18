var jQuery = require('jquery');
var Backbone = require('backbone');

var models = require('./models/posts');

//DOM ready
(function($){
  // INITIAL Requirements:
  // get the submit/loading button
  // when clicked, launch an backbone ajax request (fetch())
  // disable the button, change button text to 'Loading...'
  // when ajax is done, change the text back to the submit

  // instantiate a new collection
  var allPosts = new models.PostCollection();

  $('#fetch-posts') // get the button
    .on('click', function(){
      var $this = $(this);
      // backbone ajax method (push to call stack)
      allPosts.fetch().then(function(){
        // make available again
        $this.text('Submit');
        $this.prop('disabled', false);
      });
      // disable the button while we wait
      $this.text('Loading...');
      $this.prop('disabled', true);

      // backbone event listener/handler
      allPosts.on('add', function(){
        console.log('emitting add event');
      });

    });


}(jQuery));
