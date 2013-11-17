var email = require('./email');

module.exports = function (app, store) {
  var model = store.createModel();

  function getUsername($public) {
    return $public.get('local.username')
      || $public.get('facebook.displayName')
      || $public.get('google.displayName')
      || $public.get('twitter.displayName');
  }

  app.on('user.changeEmail', function (options) {
    var $public = model.at('usersPublic.' + options.userId)
      , $private = model.at('usersPrivate.' + options.userId);

    model.fetch($public, $private, function (err) {
      if (err) return console.error(err);
      var address = $private.get('local.emails.0.value');
      if (!address) return;
      email.send({
        subject: 'Please confirm your new email',
        template: {
          data: {token: options.token, username: getUsername($public)},
          name: 'changeEmail'
        },
        to: address
      });
    });
  });

  app.on('user.join', function (options) {
    var $public = model.at('usersPublic.' + options.userId)
      , $private = model.at('usersPrivate.' + options.userId);

    model.fetch($public, $private, function (err) {
      if (err) return console.error(err);
      var address = $private.get('local.emails.0.value');
      if (!address) return;
      email.send({
        subject: 'Welcome to Derby User',
        template: {
          data: {token: options.token, username: getUsername($public)},
          name: 'welcome'
        },
        to: address
      });
    });
  });

  app.on('user.forgotPassword', function (options) {
    var $public = model.at('usersPublic.' + options.userId)
      , $private = model.at('usersPrivate.' + options.userId);

    model.fetch($public, $private, function (err) {
      if (err) return console.error(err);
      var address = $private.get('local.emails.0.value');
      if (!address) return;
      email.send({
        subject: 'Reset your password',
        template: {
          data: {token: options.token, userId: options.userId, username: getUsername($public)},
          name: 'resetPassword'
        },
        to: address
      });
    });
  });

  app.on('user.verifyEmail', function (options) {
    var $public = model.at('usersPublic.' + options.userId)
      , $private = model.at('usersPrivate.' + options.userId);

    model.fetch($public, $private, function (err) {
      if (err) return console.error(err);
      var address = $private.get('local.emails.0.value');
      if (!address) return;
      email.send({
        subject: 'Please confirm your email address',
        template: {
          data: {token: options.token, username: getUsername($public)},
          name: 'confirmEmail'
        },
        to: address
      });
    });
  });

  return function (req, res, next) {
    next();
  }
};