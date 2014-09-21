module.exports = function(app) {

  var welcomeController = require('../app/controllers/welcome');
  var districtController = require('../app/controllers/district');
  var compareController = require('../app/controllers/compare');
  var staticController = require('../app/controllers/static');

  app.get('/', welcomeController.index);
  app.get('/district/:district', districtController.index);
  app.get('/compare/:districtA/:districtB', compareController.index);
  app.get('/about-the-project', staticController.about);

};
