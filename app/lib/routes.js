Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {
  GoogleMaps.load();
  this.next();
}, { only: ['search', 'location'] });

Router.route('/', {name: 'home'});
Router.route('/search', {name: 'search'});
Router.route('/location', {name: 'location'});
Router.route('/profile', {name: 'profile'});
Router.route('/disciplines', {name: 'disciplines'});
