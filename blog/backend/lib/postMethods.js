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
    post_featured: String
   });

   // Calling validatePost also on the server for extra security
    var errors = validatePost(postData);
    if (errors.post_url || errors.post_title || errors.post_text || errors.post_featured)
      throw new Meteor.Error('invalid-post', "Du har ikke fylt inn alle feltene riktig");

  // Debugging
   console.log('addpost method - postData: ' + postData);
   console.log('addpost method  - postData.post_title: ' + postData.post_title);
   console.log('addpost method  - postData.post_url: ' + postData.post_url);
   console.log('addpost method  - errors.post_url: ' + postData.post_url);
   console.log('addpost method - postData.post_text: ' + postData.post_text);

   // Checking if the url-already exists. the urls are unique
     var postWithSameLink = Posts.findOne({post_url: postData.post_url});

     if (postWithSameLink) {
       return {
         postExists: true,
         _id: postWithSameLink._id
         }
     }

   // Add date
   var submission = _.extend(postData, {
      savedAt: new Date(),
      userId: Meteor.user()._id,
      author: Meteor.user().username
   });

   Posts.insert(submission);

   return { _id: submission };
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

   // Calling validatePost also on the server for extra security
    var errors = validatePost(postData);
    if (errors.post_url || errors.post_title || errors.post_text || errors.post_featured)
      throw new Meteor.Error('invalid-post', "Du har ikke fylt inn alle feltene riktig");

   // Debugging
    console.log('postData: ' + postData);
    console.log('post_title: ' + postData.post_title);
    console.log('post_text: ' + postData.post_text);

  // Checking if the url-already exists. the urls are unique
    var postWithSameLink = Posts.findOne({post_url: postData.post_url});
    var currenturl = postData.currenturl;

    if (postWithSameLink && currenturl != postWithSameLink.post_url) {
      return {postExists: true}
    }

   // Debugging
   console.log('ERRORS: ' + errors);
   console.log('Error.post_title : ' + errors.post_title);
   console.log('Error.post_text : ' + errors.post_text);

   var affected =  Posts.update({_id: postData.post_id}, {$set: postData});

   if (! affected)
     throw new Meteor.Error('invalid', "You weren't able to update that post");

   return 'test';
 },
 deletepost: function(postData){
  if (!Meteor.user())
    throw new Meteor.Error(999, "Du har ikke tilatelse til å slette dette innlegget");

  Posts.remove({_id: postData._id});

  return 'post deleted';
}
  });
