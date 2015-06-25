Template.updatepost.events({
  "submit #updatepost": function (event) {
    event.preventDefault();

   // retrieve the input field values
    var postData = {
      post_title: event.target.post_title.value,
      post_url: event.target.post_url.value,
      post_text: event.target.post_text.value,
      post_thumb: event.target.post_thumb.value,
      post_featured: event.target.post_featured.value,
      currenturl: Router.current().params.post_url,
      post_id: this._id
    }

    //Debuging
   console.log('event target: ' + event.target);
   console.log('event target post_title :' + event.target.post_title.value);
   console.log('event target post_text :' + event.target.post_text.value);
   console.log('event target post_thumb :' + event.target.post_thumb.value);
   console.log('event target post_featured :' + event.target.post_featured.value);
   console.log('event target _id :' + this._id);

    // Send Email and save email
    Meteor.call("updatepost", postData, function(error, result){
      //Debugging
      console.log('error aftter call: ' + error);
      console.log('result: ' + result);


       if (error){
         var errors = validatePost(postData);
         return Session.set('postErrors', errors) + Session.set('genError', error.reason);;
       }
       else if (result) {
         return Session.set('postSuccess', 'Innlegget er uppdatert' );
       }
   });

     return false;
 }, // Submit event
  "keyup #post-title": function(event){
    var generate_url = document.getElementById('post-title').value;

    generate_url = generate_url.toLowerCase();

    generate_url = generate_url.split(" ");
    generate_url = generate_url.join("_");
    generate_url = generate_url.replace(/[^A-Za-z0-9_]/g, '');

    console.log('posttitle: ' + generate_url);
     document.getElementById('post-url').value = generate_url;
  }
});
