Template.layout.onRendered(function() {
  this.$('.button-collapse').sideNav();

  this.$('.collapsible').collapsible({
    accordion : false
  });
});

Template.layout.helpers({
  profilePictureUrl: function(id) {
    return 'http://graph.facebook.com/' + id + '/picture/?type=square';
  }
});
