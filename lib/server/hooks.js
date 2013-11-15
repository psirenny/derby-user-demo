var email = require('./email');

module.exports = function (store) {
  var model = store.createModel();

  store.hook('change', 'usersPublic.*.isRegistered',
    function (userId, isRegistered) {
      var $public = model.at('usersPublic.' + userId)
        , $private = model.at('usersPrivate.' + userId);

      model.fetch($public, $private, function (err) {
        if (err) return console.error(err);
        var address = $private.get('local.emails.0.value');
        if (!address) return;
        var username = $public.get('local.username') || $public.get('facebook.displayName') || $public.get('google.displayName') || $public.get('twitter.displayName');
        email.send({
          subject: 'Welcome to Derby User',
          template: {data: {username: username}, name: 'welcome'},
          to: address
        });
      });
    }
  );

  return function (req, res, next) {
    next();
  }
};