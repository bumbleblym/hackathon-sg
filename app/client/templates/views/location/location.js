Template.location.helpers({
  locationMapOptions: function() {

    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(1.3000, 103.8000),
        zoom: 12,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        panControl: false,
        scaleControl: true,
        streetViewControl: false
      };
    }
  }
});

Template.location.events({
  'click #marker-done': function(e) {
    var instance = Template.instance(),
        position = instance.currentMarker.getPosition();
    instance.infoWindow.close();
    instance.currentMarker.setMap(null);
    instance.currentMarker = null;
    console.log(position.lng());
    Meteor.users.update(Meteor.userId(), { $push: { locations: { coordinates: [position.lng(), position.lat()]}} });  },
  'click #marker-cancel': function(e) {
    var instance = Template.instance();
    instance.infoWindow.close();
    instance.currentMarker.setMap(null);
    instance.currentMarker = null;
  }
});

Template.location.onCreated(function() {
  var self = this;
  GoogleMaps.ready('locationMap', function(locationMap) {

    var map = locationMap.instance,
        markers = [],
        // Create the search box and link it to the UI element.
        input = (document.getElementById('pac-input')),
        searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }

      // For each place, get the icon, place name, and location.
      markers = [];
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          position: place.geometry.location
        });

        markers.push(marker);

        bounds.extend(place.geometry.location);
      }

      map.fitBounds(bounds);
    });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
      var bounds = map.getBounds();
      searchBox.setBounds(bounds);
    });

    var contentString = 
      '<div id="content">'+
        '<div class="message">Save location?</div>' +
        '<div class="message-response">' +
          '<a class="waves-effect waves-light btn-small" id="marker-cancel"><i class="material-icons left">cancel</i></a>' + 
          '<a class="waves-effect waves-light btn-small" id="marker-done"><i class="material-icons left">done</i></a>' + 
        '</div>' +
      '</div>';

    var infoWindow = new google.maps.InfoWindow({
        content: contentString
    });
    self.infoWindow = infoWindow;

    google.maps.event.addListener(map, 'click', function(e) {
      if (self.currentMarker) {
        self.currentMarker.setPosition(e.latLng);
      } else {
        self.currentMarker = new google.maps.Marker({
          position: e.latLng, 
          map: map,
          icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
        });
      }

      infoWindow.open(map, self.currentMarker);
    });

    google.maps.event.addListener(infoWindow, 'closeclick', function() {
      self.currentMarker.setMap(null);
      self.currentMarker = null;
    });
  });
});