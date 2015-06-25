Sts.allow({
  insert: function(doc) { return true; },
  update: function(userId, doc, fields, modifier) { return (userId === userId); }
});
Posts.allow({
  insert: function(userId, post) {
  return (userId === userId);
  },
  update: function(userId, post) { return (userId === userId); },
  remove: function(userId, post) { return (userId === userId); }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.post_title || errors.post_url || errors.post_content;
  }
});
  Pages.allow({
    insert: function(userId, post) {
      return (userId === userId);
    },
    update: function(userId, post) { return (userId === userId); },
    remove: function(userId, post) { return (userId === userId); }
  });
