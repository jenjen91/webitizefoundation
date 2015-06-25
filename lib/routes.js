Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

baseController = RouteController.extend({
  increment: 10,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  action: function () {
     console.log('this should be overridden!');
  }
  });

  frontpageController = baseController.extend({
    action: function () {
      this.render('frontheader', {to: 'header'});
      this.render('frontpage');
    },
    subscriptions: function() {
      Meteor.subscribe('posts', this.findOptions());
    },
    data: {
      posts: function() {return Posts.find({}, {sort: {savedAt: -1}, limit: 10}); }
    },
    waitOn: function() {
      return Meteor.subscribe('posts');
    }
  });
  singleController = baseController.extend({
    action: function () {
      this.render('header', {to: 'header'});
      this.render('single');
    },
    findOptions: function() {
      return this.params.post_url;
    },
    subscriptions: function() {
      Meteor.subscribe('posts', this.findOptions());
    },
    waitOn: function() {
      return Meteor.subscribe('posts');
    }
  });

contactController = RouteController.extend({
  action: function () {
    this.render('header', {to: 'header'});
    this.render('contact');
  }
});

Router.route('/', {
  name: 'frontpage',
  controller: frontpageController
});
Router.route('/posts/:post_url', {
  name: 'single',
  controller: singleController
});

Router.route('/contact', {
  name: 'contact',
  controller: contactController
});

Router.route('/dashboard', function () {
  if (! Meteor.userId()) {
    this.render('loginform');
  } else {
    this.render('dashboard');
  }
  this.layout('layoutdashboard');
  });


Router.route('/registerform', function () {
  this.render('registerform');
}
);

Router.route('/pagetwo', function () {
  this.render('pagetwo');
},
{name: 'pagetwo'
});
Router.route('/pageone', function () {
  this.render('pageone');
},
{name: 'pageone'
});
