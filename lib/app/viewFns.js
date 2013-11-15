var url = require('url');

module.exports = function (app) {
  app.view.fn('user.displayName', function (public) {
    if (public.facebook) return public.facebook.displayName;
    if (public.google) return public.google.displayName;
    if (public.local) return public.local.username;
    if (public.twitter) return public.twitter.displayName;
  });

  app.view.fn('user.photoUrl', function (public) {
    if (public.facebook) return 'https://graph.facebook.com/' + public.facebook.username + '/picture';
    if (public.google && public.google.photos && public.google.photos[0]) return public.google.photos[0].value;
    if (public.gravatar && public.gravatar.thumbnailUrl) return public.gravatar.thumbnailUrl;
    if (public.twitter && public.twitter.photos && public.twitter.photos[0]) return public.twitter.photos[0].value;
  });
};