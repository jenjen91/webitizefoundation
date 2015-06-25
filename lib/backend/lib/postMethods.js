Meteor.methods({
  addpost: function(postData){
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check(postData, {
    post_title: String,
    post_url: String,
    post_text: String,
    post_thumb: String,
    post_featured: String,
    post_id: String,
   });

   // handle errros
  var errors = validatePost(postData);

  // Return error messages
  if (errors.post_url)
    throw new Meteor.Error('invalid-form', errors.post_url);

  if (errors.post_title)
    throw new Meteor.Error('invalid-form', "Vennligst fyll inn din tittel");

  if (errors.post_text)
   throw new Meteor.Error('invalid-form', "Vennligst fyll text");

   // Add date
   var submission = _.extend(postData, {
      savedAt: new Date()
   });

   Posts.insert(submission);

   return {   _id: setSubId };
 },
  // UPDATE POST METHOD
  updatepost: function(postData){
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check(postData, {
    post_title: String,
    post_url: String,
    post_text: String,
    post_thumb: String,
    post_featured: String,
    currenturl: String,
    post_id: String,
   });
   // Debugging
    console.log('postData: ' + postData);
    console.log('post_title: ' + postData.post_title);
    console.log('post_text: ' + postData.post_text);

   // handle errros
  var errors = validatePost(postData);

  // Return error messages
  if (errors.post_title || errors.post_url)
        throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

  if (errors.post_url)
    throw new Meteor.Error('invalid-form', "Vennligst fyll inn url");

  if (errors.post_title)
    throw new Meteor.Error('invalid-form', "Vennligst fyll inn din tittel");

  if (errors.post_text)
   throw new Meteor.Error('invalid-form', "Vennligst fyll text");

   // Debugging
   console.log('ERRORS: ' + errors);
   console.log('Error.post_title : ' + errors.post_title);
   console.log('Error.post_text : ' + errors.post_text);

   var affected =  Posts.update({_id: postData.post_id}, {$set: postData});

   if (! affected)
     throw new Meteor.Error('invalid', "You weren't able to update that post");

   return 'test';
  }
  });

if(Meteor.isServer){

}
