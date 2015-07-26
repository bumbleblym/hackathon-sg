Template.personCard.helpers({
  profilePictureUrl: function(id) {
    return 'http://graph.facebook.com/' + id + '/picture/?type=square';
  },
  getDisciplineName: function(id) {
    return Disciplines.findOne(id).name;
  }
});

Template.personCard.events({
  'click div.collapsible-header, click span.tag': function(e) {
    var id = $(e.target).closest('li.person-card').data('id');

    Session.set('selectedId', id);
  }
});

Template.personCard.rendered = function() {
  $('.collapsible').collapsible({ accordion: true });
};