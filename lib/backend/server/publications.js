Meteor.publish("sts", function () {
  return Sts.find();
});
Meteor.publish("posts", function () {
  return Posts.find();
});
Meteor.publish("pages", function () {
  return Pages.find();
});
