config = require('./config');

module.exports = function () {
  return function (req, res, next) {
    var model = req.getModel();
    model.set('$config.origin', config.get('origin'));
    model.set('$config.repository', config.get('repository'));
    model.set('$config.version', config.get('version'));
    next();
  };
};