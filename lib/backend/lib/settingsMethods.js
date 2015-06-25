  Meteor.methods({
    updatesitesettings: function(settingsData){
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      check(settingsData, {
      title: String,
      email: String,
      dateformat: String,
      _id: String,
     });

     // Debugging
      console.log('settingsData: ' + settingsData);
      console.log('title: ' + settingsData.title);
      console.log('email: ' + settingsData.email);
      console.log('_id: ' + settingsData._id);

     var submission = _.extend(settingsData, {
        updatedAt: new Date()
     });

     Sts.update({_id: settingsData._id}, {$set: submission})

     var setSubId =  Sts.update({_id: settingsData._id}, {$set: submission})


     return {   _id: setSubId };
   }
});
