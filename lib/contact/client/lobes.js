
Template.contact.events({
 'submit #block-form' : function(e, s){
   e.preventDefault();

   // retrieve the input field values
     var email = s.find('#lobes-email').value,
        ip = s.find('#lobes-ip').value,
        block_error = '';

    // Save Contact Submissions
    ContactSubmissions.insert({
      email: email,
      ip: ip
   });

     // Clear form
     email = "";

     // Display success or error message
     document.getElementById("block-message").getElementsByTagName('p').innerHTML = block_error;
     document.getElementById("block-message").setAttribute("class", "block-error");

      return false;
   }
});
