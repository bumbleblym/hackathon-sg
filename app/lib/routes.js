Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {
  GoogleMaps.load();
  this.next();
}, { only: ['listings', 'listing'] });

Router.route('/', {name: 'home'});
Router.route('/listings', {name: 'listings'});
Router.route('/listing/create', {name: 'createListing'});
Router.route('/listing/:id', {name: 'listing'})