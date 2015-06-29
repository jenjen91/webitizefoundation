Template.postSettings.onCreated(function() {
  Session.setDefault('callbackMessage', {});
});

Template.addnew.onCreated(function() {
  Session.setDefault('callbackMessage', {});
});

Template.updatepost.onCreated(function() {
  Session.setDefault('callbackMessage', {});
});

// Clear Session on rendered
Template.addnew.onRendered(function() {
  Session.set('callbackMessage', {});
});
Template.updatepost.onRendered(function() {
  Session.set('callbackMessage', {});
});

// Get callbackMessage
Template.registerHelper("callbackMessage", function(field){
  return Session.get('callbackMessage')[field];
});

// Create callbackMessageClass
Template.registerHelper("callbackMessageClass", function(){
  if (Session.get('callbackMessage')['reason'])
    return 'send-error';

  if (Session.get('callbackMessage')['success'])
    return 'send-success'
});

// create field error class
Template.registerHelper("errorClass", function(field){
  return Session.get('callbackMessage')[field] ? 'has-error' : '';
});
