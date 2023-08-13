const errorService = require("../services/error-service.js");

module.exports = (req, res, next) => {
  if (!req.currentUser) {
    //No estoy autenticado
    errorService.notAuthenticated();
  } else {
    next();
  }
};
