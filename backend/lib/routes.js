
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

Router.route('/editpages', function(){
    this.render('editpages');
    this.layout('layoutdashboard');
  });
