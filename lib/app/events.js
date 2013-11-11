module.exports = function (app) {
  app.ready(function (model) {
    model.on('change', '_session.user.id', function (userId) {
      if (!userId) return;
      var $private = model.at('usersPrivate.' + userId);
      var $public = model.at('usersPublic.' + userId);
      model.subscribe($private, $public, function (err) {
        if (err) return console.error(err);
        model.ref('_page.user.private', $private);
        model.ref('_page.user.public', $public);
        var isRegistered = $public.get('isRegistered');
        if (model.get('_page.private') && !isRegistered) return app.history.push('/');
        if (model.get('_page.public') && isRegistered) app.history.push('/settings');
      });
    });

    model.on('change', '_session.user.isRegistered', function (isRegistered) {
      if (model.get('_page.private') && !isRegistered) return app.history.push('/');
      if (model.get('_page.public') && isRegistered) app.history.push('/settings');
    });
  });
};