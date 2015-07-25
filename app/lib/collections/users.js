Schemas.User = new SimpleSchema({
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
