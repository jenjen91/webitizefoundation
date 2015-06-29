var to = 'jenjen@webitize.me';

Template.contact.events({
 'submit #contact-form' : function(event){
   event.preventDefault();

   //Debuging
  console.log('To var: ' + to);
  console.log('event target: ' + event.target);
  console.log('event target from email :' + event.target.from.value);
  console.log('event target subject :' + event.target.subject.value);
  console.log('event target message :' + event.target.message.value);

   // retrieve the input field values
   var contactData = {
     to: to,
     from:  event.target.from.value,
     subject:  event.target.subject.value,
     message:   event.target.message.value
   };

   var contact_message = '';
   var contact_message_class = '';

   // Send Email and save email
     Meteor.call('checkContactForm', contactData, function(error, result) {

       //Debugging
       console.log('error: ' + error);
       console.log('result: ' + result);

     if (error) {
        contact_message_class = 'send-error';
        contact_message = error.reason;
        console.log(error);
      }
      else if (result) {
        contact_message_class = 'send-success';
        contact_message = 'Din mail har blitt sendt! Vi tar kontakt med deg snarest';
      }
      else {
        contact_message_class = 'send-success';
        contact_message = 'message sendt';

      }
      // Display success or error message
      document.getElementById("error-text").innerHTML = contact_message;

      document.getElementById('send-message').setAttribute('class', contact_message_class);

    });

    event.target.from.value = '';
    event.target.subject.value = '';
    event.target.message.value = '';

      return false;

   } // Submit event

});
