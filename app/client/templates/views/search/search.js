Template.search.helpers({
  searchMapOptions: function() {

    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(1.3000, 103.8000),
        zoom: 14
      };
    }
  },
  profilePictureUrl: function(id) {
    return 'http://graph.facebook.com/' + id + '/picture/?type=square';
  },
  people: function() {
    return Meteor.users.find({});
  }
});

Template.search.onRendered(function() {
  this.$('.collapsible').collapsible({
    accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  var markers = {};
  var defaultIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
  var selectedIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

  this.autorun(function() {
    if (GoogleMaps.loaded()) {
      var map = GoogleMaps.maps.searchMap.instance;

      Meteor.users.find({}).observe({
        added: function(doc) {
          var userId = doc._id;
          var userMarkers = markers[userId] =  [];
          _.each(doc.locations, function(location) {
            var coordinates = location.coordinates;
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(coordinates[1], coordinates[0]),
              map: map,
              icon: defaultIcon
            });
            userMarkers.push(marker);
          });
        },
        changed: function(newDoc, oldDoc) {
          var userId = newDoc._id;
          _.each(markers[userId], function(marker) {
            marker.setMap(null);
          });
          this.added(newDoc);
        }
      });
    }
  });

  this.autorun(function() {
    if (GoogleMaps.loaded()) {
      var selectedId = Session.get('selectedId');

      if (!!selectedId) {
        _.each(_.keys(markers), function(key) {
          var val = markers[key];

          if (key === selectedId) {
            _.each(val, function(marker) {
              if (marker.icon === selectedIcon) {
                marker.setIcon(defaultIcon);
              } else {
                marker.setIcon(selectedIcon);
              }
            });
          } else {
            _.each(val, function(marker) {
              marker.setIcon(defaultIcon);
            });
          }
        });
      }

      Session.set('selectedId', null);
    }
  });
});