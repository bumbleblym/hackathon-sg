Schemas.User = new SimpleSchema({
  proficiencies: {
    type: [Schemas.Proficiency],
    defaultValue: []
  },
  deficiencies: {
    type: [Schemas.Proficiency],
    defaultValue: []
  },
  locations: {
    type: [Schemas.Point],
    defaultValue: []
  },
  profile: {
    type: Object,
    blackbox: true
  },
  services: {
    type: Object,
    blackbox: true
  }
});

Meteor.users.attachSchema(Schemas.User);
