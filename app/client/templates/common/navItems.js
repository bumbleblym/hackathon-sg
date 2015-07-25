Template.navItems.events({
  'click a.login': function(event) {
    Meteor.loginWithFacebook({}, function(err) {
      if (err) {
        Session.set('errorMessage', err.reason || 'Unknown error');
      }
    });
  },
  'click a.logout': function(event) {
    Meteor.logout(function(err) {
      if (err) {
        Session.set('errorMessage', err.reason || 'Unknown error');
      }
    });
  }
});

