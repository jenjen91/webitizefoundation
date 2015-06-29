if (Meteor.isClient) {

  Template.dashboardmenu.events({
    "click .bt-logout": function() {
      return Meteor.logout();
    }
  });

Template.loginform.events({
   'submit #bt-login-form' : function(e, t){
     e.preventDefault();
     // retrieve the input field values
     var username = t.find('#login-username').value,
       password = t.find('#login-password').value;

       // Trim and validate your fields here....

       // If validation passes, supply the appropriate fields to the
       // Meteor.loginWithPassword() function.
       Meteor.loginWithPassword(username, password, function(err){
       if (err) {

         var err_message = '';
         switch (err.reason) {
           case 'Incorrect password':
            err_message = err.reason + '</p><hr /><p>' + 'Bytt passord - Fyll in Epost: ';
            document.getElementById("reset-password-email").setAttribute("type", "email");
            document.getElementById("reset-password-submit").setAttribute("type", "submit");
            break;
            case 'User not found':
              err_message = err.reason + 'Kontakt administrator for å bli bruker';
              break;
            default:
              err_message = 'Noe gikk galt. Kontakt administrator '

         }

         document.getElementById("error-text").innerHTML = err_message;
         document.getElementById("error").setAttribute("class", "active-error");

       }
         // The user might not have been found, or their passwword
         // could be incorrect. Inform the user that their
         // login attempt has failed.
       else {

       }
         // The user has been logged in.
     });
        return false;
     },

     'submit #reset-password-submit' : function(e, t){
       e.preventDefault();

       var email = t.find('#reset-password-email').value;

       Accounts.forgotPassword({email: email}, function(err){
       if (err) {
         // hide form input
         document.getElementById("reset-password-email").setAttribute("type", "hidden");
         document.getElementById("reset-password-email").setAttribute("placeholder", "Din Epost");
         document.getElementById("reset-password-submit").setAttribute("type", "hidden");

         //Show error message
         document.getElementById("reset-message").innerHTML = err;

       }
       else {
         // hide form input
         document.getElementById("reset-password-email").setAttribute("type", "hidden");
         document.getElementById("reset-password-submit").setAttribute("type", "hidden");

         // Show Success message
         document.getElementById("reset-message").innerHTML = 'Epost med link til å bytte passord har blitt sent til ' + email;

       }

       }); // end forgotPassword function

       return false;
     }

 });

 Template.registerform.events({
    'submit #bt-register-form' : function(e, t) {
      e.preventDefault();
      var email = t.find('#account-email').value,
        username = t.find('#account-username').value,
        password = t.find('#account-password').value;


        // Trim and validate the input

      Accounts.createUser({email: email, username: username, password : password}, function(err){
          if (err) {
            // Inform the user that account creation failed
          } else {
            // Success. Account has been created and the user
            // has logged in successfully.
            Router.go('dashboard');
          }

        });

      return false;
    }
  });
}
