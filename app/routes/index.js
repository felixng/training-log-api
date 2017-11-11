const userRoutes = require('./user_routes');
const sessionRoutes = require('./session_routes');
const weekRoutes = require('./week_routes');

module.exports = function(app, db) {
  userRoutes(app, db);
  sessionRoutes(app, db);
  weekRoutes(app, db);
};