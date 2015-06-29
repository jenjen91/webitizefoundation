Pages.allow({
  insert: function(userId, post) {
    return (userId === userId);
  },
  update: function(userId, post) { return (userId === userId); },
  remove: function(userId, post) { return (userId === userId); }
});
