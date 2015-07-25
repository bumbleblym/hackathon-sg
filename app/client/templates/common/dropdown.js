Template.dropdown.onRendered(function() {
  this.$(".dropdown-button").dropdown({ hover: true, belowOrigin: true });
});

Template.dropdown.helpers({
  profilePictureUrl: function(id) {
    return 'http://graph.facebook.com/' + id + '/picture/?type=square';
  }
});