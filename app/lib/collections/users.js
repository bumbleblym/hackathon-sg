Schemas.User = new SimpleSchema({
  proficiencies: {
    type: [Schemas.Proficiency],
    blackbox: true,
    defaultValue: []
  },
  deficiencies: {
    type: [Schemas.Proficiency],
    blackbox: true,
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
