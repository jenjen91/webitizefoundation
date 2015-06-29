Posts.allow({
  insert: function(userId, post) {
  return (userId === userId);
  },
  update: function(userId, post, fieldNames, modifier) {
    return (modifier.$set.userId === userId);
  },
  remove: function(userId, doc) {
    return (doc.author = userId);
  },
  fetch: ['author']
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.post_title || errors.post_url || errors.post_content;
  }
});
