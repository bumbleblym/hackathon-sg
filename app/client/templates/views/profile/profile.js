Template.profile.events({
  'keyup #q': function(e) {
    Session.set('q', e.target.value);
  },
  'click div.result': function(event) {
    var dataset = event.target.dataset;

    $('input[name="disciplineId"]').val(dataset.id);
    $('#discipline-name').val(dataset.name);
    $('#modal').openModal();
  }
});

Template.profile.helpers({
  proficiencySchema: function() {
    return Schemas.Proficiency;
  },
  results: function() {
    return Template.instance().results.get();
  },
  user: function() {
    return Meteor.user();
  },
  getDisciplineName: function(id) {
    return Disciplines.findOne(id).name;
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
      var teach = $('#teach');
      var check = false;
      if (teach.is(':checked')) {
        type = 'proficiencies';
        check = true;
      } else {
        type = 'deficiencies';
      }
      $push[type] = doc;

      Meteor.users.update(Meteor.userId(), {
        $push: $push
      });

      this.done();

      if (check === true) {
        teach.prop('checked' , true);
      } else {
        $('#learn').prop('checked' , true);
      }

      return false;
    }
  }
});
