Meteor.publish("contact_submissions", function () {
return ContactSubmissions.find();
});
Meteor.publish("lobes", function () {
return Lobes.find();
});
