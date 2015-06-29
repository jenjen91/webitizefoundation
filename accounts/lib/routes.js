userController = RouteController.extend({
template: 'layoutdashboard',
subscriptions: function() {
  Meteor.subscribe('userData', {sort: {createdAt: -1}, limit: 20});
},
data: {
  users: function() {return Meteor.users.find({}, {sort: {createdAt: -1}, limit: 20}, {fields: {username: 1, emails: 1}}); }
},
action: function () {
  this.render('users');
  this.layout('layoutdashboard');
},
waitOn: function() {
  return Meteor.subscribe('userData');
}
});

Router.route('/users', {
  name: 'users',
  controller: 'userController'
});
