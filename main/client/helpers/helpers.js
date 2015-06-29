Template.header.helpers({
  headtitle: function() {
    var url = Router.current().route.getName();


    if (url == "single") {
      var purl = Router.current().params.post_url;
      var p = Posts.findOne({post_url: purl});
      return  p && p.post_title;
    }
    else if (url == "contact")  {
      return "Ta kontakt!";
    }
  }
});
Template.menu.helpers({
  sts: function() {
    return  Sts.findOne();
    }
});
