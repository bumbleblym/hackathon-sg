Meteor.publish(null, function() {
  return Meteor.users.find({}, {
    fields: {
      proficiencies: 1,
      deficiencies: 1,
      locations: 1
    }
  });
});
