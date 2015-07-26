Template.dropdownItems.events({
  'click a.logout': function(event) {
    Meteor.logout(function(err) {
      if (err) {
        Session.set('errorMessage', err.reason || 'Unknown error');
      }
    });
  }
});
