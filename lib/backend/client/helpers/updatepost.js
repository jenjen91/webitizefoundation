Template.updatepost.created = function() {
  Session.set('genError', '');
  Session.set('postErrors', {});
  Session.set('postSuccess', '');
}
Template.registerHelper("genErrorClass", function(argument){
  return !!Session.get('genError') ? 'send-error' : '';
});
Template.registerHelper("seMessage", function(argument){
  if (Session.get('genError'))
    return Session.get('genError');

  if (Session.get('postSuccess'))
    return Session.get('postSuccess');
});

Template.updatepost.helpers({
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



Template.updatepost.onRendered(function () {
  var purl = Router.current().params.post_url;
  var featuredValue = Posts.findOne({post_url: purl}).post_featured;

  var leng =   document.getElementsByClassName('radio').length;

  var i = 0;
  while(i < leng) {
    console.log(document.getElementsByClassName('radio')[i].value)
    var ddf =   document.getElementsByClassName('radio')[i].value

    if (ddf == featuredValue)
      document.getElementsByClassName('radio')[i].checked = true;
    i++
  }
  console.log(featuredValue);
});
