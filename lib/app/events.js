module.exports = function (app) {
  app.ready(function (model) {
    model.on('change', '_session.user.isRegistered', function (isRegistered) {
      if (model.get('_page.private') && !isRegistered) return app.history.push('/');
      if (model.get('_page.public') && isRegistered) app.history.push('/settings');
    });
  });
};