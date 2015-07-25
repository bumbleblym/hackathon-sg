Meteor.publish(null, function() {
  return Meteor.users.find({
    _id: this.userId
  }, {
    fields: {
      proficiencies: 1,
      deficiencies: 1,
      locations: 1
    }
  });
});
