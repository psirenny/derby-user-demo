module.exports = function (app) {
  app.ready(function (model) {
    model.on('change', '$connection.state', function (state) {
      if (state !== 'connected') return;
      if (model.get('_session.user.id')) return;
      var origin = model.get('$config.origin');
      $.ajax({type: 'POST', url: origin + '/user/sessionize'}).done(function (data) {
        model.set('_session.user.id', data.user.id);
        model.set('_session.user.registered', data.user.registered);
      });
    });

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