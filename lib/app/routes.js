module.exports = function (app) {
  app.get('*', function (page, model, params, next) {
    model.set('_page.navbarForm.redirect', true);
    next();
  });

  app.get('/', function (page) {
    page.render('home');
  });

  app.get('/403', function (page) {
    page.render('403');
  });

  app.get('/404', function (page) {
    page.render('404');
  });

  app.get('/500', function (page) {
    page.render('500');
  });

  app.get('/forgot', function (page, model) {
    model.set('_page.public', true);
    page.render('forgot');
  });

  app.get('/reset/:userId/:token', function (page, model) {
    model.set('_page.form.token', page.params.token);
    model.set('_page.form.userId', page.params.userId);
    model.set('_page.public', true);
    page.render('reset');
  });

  app.get('/settings', function (page, model) {
    model.set('_page.private', true);
    model.setNull('_page.form.changeUsername.username.value', model.get('_page.user.public.local.username'));
    model.setNull('_page.form.changeEmail.email.value', model.get('_page.user.private.local.emails.0.value'));
    page.render('settings');
  });

  app.get('/signin', function (page, model, params) {
    model.set('_page.public', true);
    model.setNull('_page.form.event', params.query.submitted);
    model.setNull('_page.form.password.query', params.query.password);
    model.setNull('_page.form.usernameOrEmail.query', params.query.usernameOrEmail);
    page.render('signin');
  });

  app.enter('/signin', function (model) {
    model.setNull('_page.form.event', model.get('_page.form.event') || '');
    model.setNull('_page.form.password.value', model.get('_page.form.password.query') || '');
    model.setNull('_page.form.usernameOrEmail.value', model.get('_page.form.usernameOrEmail.query') || '');
  });

  app.get('/signup', function (page, model) {
    model.set('_page.public', true);
    page.render('signup');
  });

  app.get('/user/auth/:provider/done', function (page, model) {
    page.render('home');
  });

  app.enter('/user/auth/:provider/done', function (model) {
    if (!window.opener) return;
    var userId = model.get('_session.user.id');
    window.opener.DERBY.app.model.set('_session.user.id', userId);
    window.opener.DERBY.app.model.set('_session.user.registered', true);
    window.close();
  });
};