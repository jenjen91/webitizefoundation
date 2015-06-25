Template.addnew.created = function() {
  Session.set('genError', {});
  Session.set('postErrors', {});
  Session.set('postSuccess', {});
}
Template.registerHelper("genErrorClass", function(argument){
  return !!Session.get('genError') ? 'has-error' : '';

});
Template.registerHelper("seMessage", function(argument){
  if (Session.get('genError'))
    return Session.get('genError');

  else if (Session.get('postSuccess'))
    return Session.get('postSuccess');
});
Template.addnew.helpers({
  successClass: function() {
    return Session.get('postSuccess') ? 'send-success' : '';
  },
  errorMessage: function(field) {
    return Session.get('postErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postErrors')[field] ? 'has-error' : '';
  }
});
