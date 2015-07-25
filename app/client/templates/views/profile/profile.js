Template.profile.events({
  'keyup #q': function(e) {
    Session.set('q', e.target.value);
  },
  'click div.results': function(event) {
    var dataset = event.target.dataset;

    $('input[name="disciplineId"]').val(dataset.id);
    $('#discipline-name').val(dataset.name);
  }
});

Template.profile.helpers({
  proficiencySchema: function() {
    return Schemas.Proficiency;
  },
  results: function() {
    return Template.instance().results.get();
  }
});

Template.profile.onRendered(function() {
  var results = Template.instance().results;

  Session.setDefault('q', '');
  Session.setDefault('results', []);
  $('#q').focus();

  this.autorun(function() {
    var q = Session.get('q');

    index.search(q, function(error, content) {
      if (error) {
        console.error('Error during Algolia search: ', error);
      } else {
        results.set(content.hits);
      }
    });
  });
});

Template.profile.onCreated(function() {
  this.results = new ReactiveVar([]);
});

AutoForm.hooks({
  insertProficiencyForm: {
    onSubmit: function(doc) {
      var $push = {};
      var type;
      if ($('#teach').is(':checked')) {
        type = 'proficiencies';
      } else {
        type = 'deficiencies';
      }
      $push[type] = doc;

      Meteor.users.update(Meteor.userId(), {
        $push: $push
      });

      this.done();

      return false;
    }
  }
});
