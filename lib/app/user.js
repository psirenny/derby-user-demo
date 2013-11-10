module.exports = function (app) {
  app.get('*', function (page, model, params, next) {
    var userId = model.get('_session.user.id');
    if (!userId) return next();
    var $private = model.at('usersPrivate.' + userId);
    var $public = model.at('usersPublic.' + userId);
    model.subscribe($private, $public, function (err) {
      if (err) return next(err);
      model.ref('_page.user.private', $private);
      model.ref('_page.user.public', $public);
      next();
    });
  });
};