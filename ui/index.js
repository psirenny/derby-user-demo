var config = {
  filename: __filename,
  scripts: {
    connectionAlert: require('./connectionAlert')
  }
};

module.exports = function (app, options) {
  app.createLibrary(config, options);
};