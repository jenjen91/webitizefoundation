Template.single.helpers({
  post: function() {
    var curl = Router.current().params.post_url;
    return  Posts.findOne({post_url: curl});
    }
});
