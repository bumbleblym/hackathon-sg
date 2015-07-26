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
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  var markers = {};

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
              icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
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
});