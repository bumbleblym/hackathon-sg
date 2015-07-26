Template.personCard.helpers({
  profilePictureUrl: function(id) {
    return 'http://graph.facebook.com/' + id + '/picture/?type=square';
  },
  getDisciplineName: function(id) {
    return Disciplines.findOne(id).name;
  }
});

Template.personCard.rendered = function() {
  $('.collapsible').collapsible();
};