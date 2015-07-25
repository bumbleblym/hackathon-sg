Disciplines = new Mongo.Collection('disciplines');

Schemas.Discipline = new SimpleSchema({
  Name: {
    type: String,
    unique: true
  },
  Levels: {
    type: String,
    label: 'Education levels',
    minCount: 1,
    allowedValues: ['primary', 'secondary', 'post-secondary', 'tertiary', 'other'],
    autoform: {
      FieldInput: {
        firstOption: "(Select a State)"
      }
    }
  }
});

Disciplines.attachSchema(Schemas.Discipline);
