var _ = require('lodash');

module.exports = function (app) {
  app.enter('*', function (model) {
    model.on('change', '$connection.state',
      function (state) {
        if (state !== 'connected') return;
        if (model.get('_session.user.id')) return;
        var origin = model.get('$config.origin');
        $.post(origin + '/user/sessionize').done(function (data) {
          model.set('_session.user.id', data.user.id);
          model.set('_session.user.registered', data.user.registered);
        });
      }
    );

    model.on('change', '_session.user.id',
      function (userId) {
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
      }
    );

    model.on('change', '_session.user.isRegistered',
      function (isRegistered) {
        if (model.get('_page.private') && !isRegistered) return app.history.push('/');
        if (model.get('_page.public') && isRegistered) app.history.push('/settings');
      }
    );
  });

  app.enter('/signin', function (model) {
    var checkPassword = _.debounce(function (model) {
      var usernameOrEmail = model.get('_page.form.usernameOrEmail.value')
        , password = model.get('_page.form.password.value')
        , data = {password: password, usernameOrEmail: usernameOrEmail}
        , url = model.get('$config.origin') + '/user/checkPassword';

      $.ajax({async: false, data: data, type: 'POST', url: url}).done(function (data) {
        model.set('_page.form.password.matches', !data.error);
      });
    }, 300);

    model.on('change', '_page.form.usernameOrEmail.value',
      function (value) {
        var origin = model.get('$config.origin')
          , password = model.get('_page.form.password.value')
          , $query = !~value.indexOf('@')
              ? model.query('usersPublic', {'local.username': value})
              : model.query('usersReserved', {'local.emails': value});

        $query.subscribe(function (err) {
          if (!err) $query.ref('_page.form.usernameOrEmail.found');
        });

        if (password) checkPassword(model);
      }
    );

    model.on('change', '_page.form.password.value',
      function (value) {
        if (value) checkPassword(model);
      }
    )
  });

  app.enter('/signup', function (model) {
    model.on('change', '_page.form.email.value',
      function (value) {
        var $query = model.query('usersReserved', {'local.email': value});
        $query.subscribe(function (err) {
          if (!err) $query.ref('_page.form.email.found');
        });
      }
    );

    model.on('change', '_page.form.username.value',
      function (username) {
        var $query = model.query('usersPublic', {'local.username': username});
        $query.subscribe(function (err) {
          if (!err) $query.ref('_page.form.username.found');
        });
      }
    );
  });
};