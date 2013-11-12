module.exports = function (app) {
  app.view.fn('user.displayName', function (public) {
    if (public.local) return public.local.username;
    if (public.facebook) return public.facebook.displayName;
  });

  app.view.fn('user.photoUrl', function (public) {
    if (public.facebook) return 'https://graph.facebook.com/' + public.facebook.username + '/picture';
  });
};