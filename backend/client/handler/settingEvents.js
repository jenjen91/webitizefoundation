Template.layoutdashboard.events({
  "submit #editsettings": function (event) {
    event.preventDefault();

    //Debuging
   console.log('event target: ' + event.target);
   console.log('event target sitetitle :' + event.target.sitetitle.value);
   console.log('event target siteemail :' + event.target.siteemail.value);
   console.log('event target sitesettings_id :' + event.target.sitesettings_id.value);

   // retrieve the input field values
    var setttingsData = {
      title: event.target.sitetitle.value,
      email: event.target.siteemail.value,
      dateformat: event.target.dateformat.value,
      _id: event.target.sitesettings_id.value
    }
    var settings_message = '';
    var settings_message_class = '';

    // Send Email and save email
    Meteor.call("updatesitesettings", setttingsData, function(error, result){
      //Debugging
      console.log('error: ' + error);
      console.log('result: ' + result);

       if (error){
         settings_message = error.reason;
         settings_message_class = 'send-error';
       }
       else if (result) {
         settings_message = 'Innstillinger updatert';
         settings_message_class = 'send-success';
       }
       // Display success or error message
       document.getElementById("error-text").innerHTML = settings_message;

       document.getElementById('send-message').setAttribute('class', settings_message_class);

   });

     return false;
 } // Submit event

});
