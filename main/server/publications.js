Meteor.publish("sts", function () {
  return Sts.find();
});
