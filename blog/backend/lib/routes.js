postSettingsController = RouteController.extend({
  template: 'layoutdashboard',
  increment: 10,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  onBeforeAction: function () {
    if (!Meteor.userId()) {
      this.render('loginform');
   } else {
     this.next();
   }
 },
  action: function () {
     console.log('this should be overridden!');
  },
  subscriptions: function() {
    Meteor.subscribe('posts', this.findOptions());
  },
  data: function() {
    console.log('this should be overridden!');
  },
});
addpostController = postSettingsController.extend({
  data: {
    posts: function() {return Posts.find({}, {sort: {savedAt: -1}, limit: 20}); }
  },
  action: function () {
      this.render('postSettings');
      this.layout('layoutdashboard');
  },
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

addnewController = postSettingsController.extend({
  action: function () {
      this.render('addnew');
      this.layout('layoutdashboard');
  },
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

updatepostController = postSettingsController.extend({
  data: function() {return Posts.findOne({post_url: this.params.post_url});
  },
  action: function () {
      this.render('updatepost');
      this.layout('layoutdashboard');
  },
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

Router.route('/postssettings', {
  name: 'postSettings',
  controller: 'addpostController'
});
Router.route('/addnew', {
  name: 'addnew',
  controller: 'addnewController'
});
Router.route('/updatepost/:post_url', {
  name: 'updatepost',
  controller: 'updatepostController'
});
