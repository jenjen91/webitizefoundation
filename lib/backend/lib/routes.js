
dashboardController = RouteController.extend({
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
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  data: {
    sts: function() {return Sts.findOne({}); },
    posts: function() {return Posts.find({}, {sort: {createdAt: -1}, limit: 10}); }
  }
});

sitesettingController = dashboardController.extend({
  action: function () {
      this.render('sitesettings');
      this.layout('layoutdashboard');
    }
});
editcontactformController = dashboardController.extend({
  action: function () {
      this.render('editcontactform');
      this.layout('layoutdashboard');
    },
    data: {
      contactsub: function() {return ContactSubmissions.find({}, {sort: {sendtAt: -1}, limit: 10}); },
      lobes: function() {return Lobes.find({}, {sort: {limit: 40}}); }
    },
    subscriptions: function() {
      Meteor.subscribe("contact_submissions");
      Meteor.subscribe("lobes");
    }
});
addpostController = dashboardController.extend({
  sort: {createdAt: -1},
  limit: 5,
  action: function () {
      this.render('addpost');
      this.layout('layoutdashboard');
  },
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

addnewController = dashboardController.extend({
  sort: {createdAt: -1},
  limit: 5,
  action: function () {
      this.render('addnew');
      this.layout('layoutdashboard');
  },
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

updatepostController = dashboardController.extend({
  sort: {savedAt: -1},
  limit: 5,
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

Router.route('/sitesettings', {
  name: 'sitesettings',
  controller: 'sitesettingController',
});
Router.route('/editcontactform', {
  name: 'editcontactform',
  controller: 'editcontactformController',
});
Router.route('/hosting', function(){
    this.render('hosting');
    this.layout('layoutdashboard');
  }, { name: 'hosting'});

Router.route('/users', function(){
    this.render('users');
    this.layout('layoutdashboard');
  });
Router.route('/editpages', function(){
    this.render('editpages');
    this.layout('layoutdashboard');
  });

Router.route('/addpost', {
  name: 'addpost',
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
