/*
ContactSubmissions.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});
*/
Lobes.allow({
  insert: function(post) { return true; }
});

if(Meteor.isClient){
  // Meteor.subscribe("lobes");
}
