Disciplines = new Mongo.Collection('disciplines');

Schemas.Discipline = new SimpleSchema({
  name: {
    type: String,
    unique: true
  },
  levels: {
    type: [String],
    label: 'Education levels',
    minCount: 1,
    allowedValues: ['primary', 'secondary', 'post-secondary', 'tertiary', 'other']
  }
});

Disciplines.attachSchema(Schemas.Discipline);
