Template.personCard.helpers({
  profilePictureUrl: function(id) {
    return 'http://graph.facebook.com/' + id + '/picture/?type=square';
  },
  getDisciplineName: function(id) {
    return Disciplines.findOne(id).name;
  }
});

Template.personCard.events({
  'click li.person-card': function(e) {
    var id = e.target.dataset.id;

    Session.set('selectedId', id);
  }
});

Template.personCard.rendered = function() {
  $('.collapsible').collapsible({ accordion: true });
};