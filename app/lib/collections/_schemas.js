Schemas = {};

SimpleSchema.messages({
  pointSchema: '[label] should be [longitude, latitude]',
  lonOutOfRange: '[label] longitude should be between -90 and 90',
  latOutOfRange: '[label] latitude should be between -180 and 180'
});

Schemas.Point = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['Point']
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
