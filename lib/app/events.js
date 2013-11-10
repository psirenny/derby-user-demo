module.exports = function (app) {
  app.ready(function (model) {
    model.on('change', '_session.user.isRegistered', function (isRegistered) {
      if (isRegistered) return;
      if (!model.get('_page.private')) return;
      app.history.push('/')
    });
  });
};