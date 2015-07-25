Template.listings.helpers({
  listingsMapOptions: function() {

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

Template.listings.onRendered(function() {
  function showPosition(position) {
    console.log("lat: " + position.coords.latitude + ", lng: " + position.coords.longitude);

    if (GoogleMaps.loaded()) {
      var map = GoogleMaps.maps.listingsMap.instance
      map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
});