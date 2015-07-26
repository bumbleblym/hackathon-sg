Meteor.startup(function() {
  if (Disciplines.find().count() === 0) {
    HTTP.get('https://nusmods.com/api/2015-2016/moduleList.json', function(error, result) {
      if (error) {
        console.error(error);
      } else {
        _.each(result.data, function(mod) {
          Disciplines.insert({
            name: mod.ModuleCode + ' ' + mod.ModuleTitle,
            levels: ['tertiary']
          });
        });
      }
    });
  }
});
