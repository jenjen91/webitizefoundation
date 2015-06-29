Template.addnew.events({
  "submit #addnew": function (event) {
    event.preventDefault();

    // retrieve the input field values
    var postData = {
      post_title: event.target.post_title.value,
      post_url: event.target.post_url.value,
      post_text: event.target.post_text.value,
      post_thumb: event.target.post_thumb.value,
      post_featured: event.target.post_featured.value
    };

      //Debuging
      console.log('event target: ' + event.target);
      console.log('event target post_title :' + event.target.post_title.value);
      console.log('event target post_text :' + event.target.post_text.value);
      console.log('event target post_thumb :' + event.target.post_thumb.value);
      console.log('event target post_featured :' + event.target.post_featured.value);

      // handle errros
      var errors = validatePost(postData);


   // Return error messages
   if (errors.post_url || errors.post_title || errors.post_text || errors.post_featured) {
      // Combining all the errors into one in errors.reason
      errors.reason = '';
      for(var key in errors) {
        console.log('From addnewEvents.js, after validatePost - ' + key + '= ' + errors[key]);
        errors.reason += errors[key] + '. ';
      }
      return Session.set('callbackMessage', errors);
    };
    // Send Email and save email
    Meteor.call("addpost", postData, function(error, result){
      //Debugging
      console.log('error: ' + error);
      console.log('result: ' + result);
      console.log('result postData.post_url: ' + postData.post_url);

       if (error){
        errors.reason = error.reason;
        return Session.set('callbackMessage', errors);
      } else if (result.postExists) {
        errors.post_url = 'Det finnes allerede et innlegg med denne URL-addressen';
        return Session.set('callbackMessage', errors);
      } else if (result) {
          callbackMessage = {};
          callbackMessage.success = 'Innlegget er lagret';
          Session.set('callbackMessage', callbackMessage);
        }
      return Router.go('updatepost', {post_url: postData.post_url});
   });


     return false;
 }, // Submit event
  "submit #image-upload": function (event) {
    event.preventDefault();

    // retrieve the input field values
    var image = event.target.image.value;


    //Debuging
    console.log('event target: ' + event.target.image.value);

    // handle errros
    var errors = validateImageUpload(image);
    if (errors)
      console.log(errors)
      // Debuging
      for(var key in errors) {
        console.log('From addnewEvents.js, after validatePost - ' + key + '= ' + errors[key]);
      }
      Session.set('callbackMessage', errors);

    // Upload image from server
    Meteor.call("imageUpload", image, function(error, result){
      //Debugging
      console.log('error: ' + error);
      console.log('result: ' + result);

       if (error){
        errors.reason = 'Feil ved opplasting av bilde: ' + error.reason;
        return Session.set('callbackMessage', errors);
      } else if (result) {
          callbackMessage = {};
          callbackMessage.success = 'Bildet er lastet opp';
          return Session.set('callbackMessage', callbackMessage);
        }

   });
     return 'hello';
 }, // Submit event
 "click #insert-image": function() {
   var imageList = document.getElementById('image-list');
   imageList.style.display = "block";

   Meteor.call("getimages", function(error, result){
     //Debugging
     console.log('error: ' + error);
     console.log('result: ' + result);
     console.log('result.length: ' + result.length);
     console.log('result[1]: ' + result[1]);

     for (var i = 0; i < result.length; i++) {
       var file = result[i];
       var img = document.createElement("img");

       var srcadd = '/images/' + result[i];
       document.getElementsByTagName("img").setAttribute("src", srcadd);

     }
   });

 },
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
Template.imageList.events({
  "click #close-image-list": function(){
    var imageList = document.getElementById('image-list');
    imageList.style.display = "none";
  }
});
handleFiles = function(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /^image\//;

    if (!imageType.test(file.type)) {
      continue;
    }

    var preview = document.getElementById('fileList');
    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }
}
