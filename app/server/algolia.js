var client = AlgoliaSearch('JTP4KI0A3E', '0d587201ed21546ebfa049f7192117d1');
var index = client.initIndex('disciplines');

Disciplines.after.insert(function(userId, doc) {
  var discipline = _.clone(doc);
  discipline.objectID = discipline._id;
  delete discipline._id;

  index.saveObjects([discipline], function(error, content) {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Content:', content);
    }
  });
});
