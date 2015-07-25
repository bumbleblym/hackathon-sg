Schemas = {};

SimpleSchema.messages({
  notFound: '[value] [label] cannot be found',
  pointSchema: '[value] should be [longitude, latitude]',
  lonOutOfRange: '[value] longitude should be between -90 and 90',
  latOutOfRange: '[value] latitude should be between -180 and 180'
});

Schemas.Point = new SimpleSchema({
  type: {
    type: String,
    autoValue: function() {
      return 'Point';
    }
  },
  coordinates: {
    type: [Number],
    decimal: true,
    custom: function() {
      var lonLat = this.value;
      if (lonLat.length != 2) {
        return 'pointSchema';
      }

      var lon = lonLat[0];
      if (lon < 90 || lon > 90) {
        return 'lonOutOfRange';
      }

      var lat = lonLat[1];
      if (lat < 180 || lat > 180) {
        return 'latOutOfRange';
      }
    }
  }
});

Schemas.Product = new SimpleSchema({
  price: {
    type: Number,
    min: 0,
    exclusiveMin: true,
    decimal: true
  },
  disciplineId: {
    type: SimpleSchema.RegEx.Id,
    custom: function() {
      if (Disciplines.findOne(this.value) === undefined) {
        return notFound;
      }
    }
  },
  level: {
    type: String,
    label: 'Education level',
    allowedValues: ['primary', 'secondary', 'post-secondary', 'tertiary', 'other'],
    custom: function() {
      var discipline = Disciplines.findOne(this.field('disciplineId').value);

      if (!_.contains(discipline.levels, this.value)) {
        return 'notAllowed';
      }
    }
  }
});
