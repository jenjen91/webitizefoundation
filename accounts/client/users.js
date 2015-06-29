Template.users.events({
  "submit #create-user": function(event){
    event.preventDefault();

    console.log('username: ' + event.target.username.value)
    console.log('email: ' + event.target.email.value)
    console.log('password: ' + event.target.password.value)
    console.log('permission: ' + event.target.permission.value)

    userData = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      profile: {permission: event.target.permission.value}
    }
    Accounts.createUser(userData, function(error){
      if(error){
        console.log(error);
        Session.set('message', error);
        throw new Meteor.Error('invalid', 'User not created');
      } else {
        return Session.set('message', 'Account created');
      }
    });

      return false;
  } // End submit event
});
Template.users.onCreated(function() {
  Session.setDefault('message', '');
});

Template.users.helpers({
  message: function(){
    return Session.get('message');
  },
  messageClass: function(){
    if (Session.equals('message',  'Account created')) {
      return 'send-success';
    } else {
      return 'send-error';
    }
  }
});
