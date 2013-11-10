module.exports = function (app) {
  app.get('/', function (page) {
    page.render('home');
  });

  app.get('/403', function (page) {
    page.render('403');
  });

  app.get('/404', function (page) {
    page.render('404');
  });

  app.get('/404', function (page) {
    page.render('404');
  });

  app.get('/500', function (page) {
    page.render('500');
  });

  app.get('/change', function (page, model) {
    model.set('_page.private', true);
    page.render('change');
  });

  app.get('/forgot', function (page, model) {
    model.set('_page.public', true);
    page.render('forgot');
  });

  app.get('/settings', function (page, model) {
    model.set('_page.form.username', model.get('_page.user.public.local.username'));
    model.set('_page.form.email', model.get('_page.user.private.local.email'));
    model.set('_page.private', true);
    page.render('settings');
  });

  app.get('/signin', function (page, model) {
    model.set('_page.public', true);
    page.render('signin');
  });

  app.get('/signup', function (page, model) {
    model.set('_page.public', true);
    page.render('signup');
  });
};