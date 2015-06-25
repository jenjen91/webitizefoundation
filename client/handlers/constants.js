Router.onBeforeAction(function () {
  var currentRoute = Router.current().route.getName();
  $('body').removeClass().addClass(currentRoute);
  this.next();
});
