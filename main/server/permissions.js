Sts.allow({
  insert: function(doc) { return true; },
  update: function(userId, doc, fields, modifier) { return (userId === userId); }
});


  
