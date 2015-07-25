Template.location.helpers({
  locationMapOptions: function() {

    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(1.3000, 103.8000),
        zoom: 14
      };
    }
  }
});

Template.location.events({
  'click #new-location': function(e) {

  }
});