Template.layout.events({
  'click a.login': function(event) {
    Meteor.loginWithFacebook({}, function(err) {
      if (err) {
        Session.set('errorMessage', err.reason || 'Unknown error');
      }
    });
  }
});

Template.layout.helpers({
  profilePictureUrl: function(id) {
    return 'http://graph.facebook.com/' + id + '/picture/?type=square';
  },
  loggingIn: Meteor.loggingIn
});

Template.layout.onRendered(function() {
  this.$('.button-collapse').sideNav();

  this.$('.collapsible').collapsible({
    accordion : false
  });
});
