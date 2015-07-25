Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});
Router.route('/listings', {name: 'listings'});
Router.route('/listing/create', {name: 'createListing'});
Router.route('/listing/:id')