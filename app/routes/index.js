const userRoutes = require('./user_routes');
const sessionRoutes = require('./session_routes');
const weekRoutes = require('./week_routes');

module.exports = function(app, db, checkJwt, checkScopes) {
  userRoutes(app, db, checkJwt, checkScopes);
  sessionRoutes(app, db, checkJwt, checkScopes);
  weekRoutes(app, db, checkJwt, checkScopes);
};