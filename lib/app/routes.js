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
    model.start('$validate.user.forgotPassword.usernameOrEmail', '_page.form.usernameOrEmail.errors', '_page.form.usernameOrEmail.value', '_page.form.usernameOrEmail.found');
    model.start('$validate.messages', '_page.form.usernameOrEmail.messages', '_page.form.usernameOrEmail.errors', '_page.form.usernameOrEmail.event', '_page.form.event', '$validate.user.rules.usernameOrEmail');
    page.render('forgot');
  });

  app.get('/reset/:userId/:token', function (page, model) {
    model.set('_page.form.token', page.params.token);
    model.set('_page.form.userId', page.params.userId);
    model.set('_page.public', true);
    model.start('$validate.user.resetPassword.form', '_page.form.errors', '_page.form.password.value', '_page.form.confirmPassword.value', '$validate.user.schema');
    model.start('$validate.user.resetPassword.password', '_page.form.password.errors', '_page.form.password.value', '$validate.user.schema');
    model.start('$validate.user.resetPassword.confirmPassword', '_page.form.confirmPassword.errors', '_page.form.password.value', '_page.form.confirmPassword.value', '$validate.user.schema');
    model.start('$validate.messages', '_page.form.password.messages', '_page.form.password.errors', '_page.form.password.event', '_page.form.event', '$validate.user.rules.password');
    model.start('$validate.messages', '_page.form.confirmPassword.messages', '_page.form.confirmPassword.errors', '_page.form.confirmPassword.event', '_page.form.event', '$validate.user.rules.confirmPassword');
    page.render('reset');
  });

  app.get('/settings', function (page, model) {
    model.set('_page.private', true);
    model.setNull('_page.form.changeUsername.username.value', model.get('_page.user.public.local.username'));
    model.setNull('_page.form.changeEmail.email.value', model.get('_page.user.private.local.emails.0.value'));
    model.start('$validate.user.changeEmail.email', '_page.form.changeEmail.email.errors', '_page.form.changeEmail.email.value', '_page.form.changeEmail.email.found', '$validate.user.schema');
    model.start('$validate.user.changeUsername.username', '_page.form.changeUsername.username.errors', '_page.form.changeUsername.username.value', '_page.form.changeUsername.username.found', '$validate.user.schema');
    model.start('$validate.user.resetPassword.form', '_page.form.changePassword.errors', '_page.form.changePassword.password.value', '_page.form.changePassword.confirmPassword.value', '$validate.user.schema');
    model.start('$validate.user.resetPassword.password', '_page.form.changePassword.password.errors', '_page.form.changePassword.password.value', '$validate.user.schema');
    model.start('$validate.user.resetPassword.confirmPassword', '_page.form.changePassword.confirmPassword.errors', '_page.form.changePassword.password.value', '_page.form.changePassword.confirmPassword.value', '$validate.user.schema');
    model.start('$validate.messages', '_page.form.changeEmail.email.messages', '_page.form.changeEmail.email.errors', '_page.form.changeEmail.email.event', '_page.form.changeEmail.event', '$validate.user.rules.email');
    model.start('$validate.messages', '_page.form.changePassword.confirmPassword.messages', '_page.form.changePassword.confirmPassword.errors', '_page.form.changePassword.confirmPassword.event', '_page.form.changePassword.event', '$validate.user.rules.confirmPassword');
    model.start('$validate.messages', '_page.form.changePassword.password.messages', '_page.form.changePassword.password.errors', '_page.form.changePassword.password.event', '_page.form.changePassword.event', '$validate.user.rules.password');
    model.start('$validate.messages', '_page.form.changeUsername.username.messages', '_page.form.changeUsername.username.errors', '_page.form.changeUsername.username.event', '_page.form.changeUsername.event', '$validate.user.rules.username');
    page.render('settings');
  });

  app.get('/signin', function (page, model, params) {
    model.set('_page.public', true);
    model.start('$validate.user.signin.form', '_page.form.errors', '_page.form.password.value', '_page.form.password.matches', '_page.form.usernameOrEmail.value', '_page.form.usernameOrEmail.found', '$validate.user.schema');
    model.start('$validate.user.signin.password', '_page.form.password.errors', '_page.form.password.value', '_page.form.password.matches', '_page.form.usernameOrEmail.found', '$validate.user.schema');
    model.start('$validate.user.signin.usernameOrEmail', '_page.form.usernameOrEmail.errors', '_page.form.usernameOrEmail.value', '_page.form.usernameOrEmail.found');
    model.start('$validate.messages', '_page.form.password.messages', '_page.form.password.errors', '_page.form.password.event', '_page.form.event', '$validate.user.rules.password');
    model.start('$validate.messages', '_page.form.usernameOrEmail.messages', '_page.form.usernameOrEmail.errors', '_page.form.usernameOrEmail.event', '_page.form.event', '$validate.user.rules.usernameOrEmail');
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
    model.start('$validate.user.signup.form', '_page.form.errors', '_page.form.email.value', '_page.form.email.found', '_page.form.password.value', '_page.form.username.value', '_page.form.username.found', '$validate.user.schema');
    model.start('$validate.user.signup.email', '_page.form.email.errors', '_page.form.email.value', '_page.form.email.found', '$validate.user.schema');
    model.start('$validate.user.signup.password', '_page.form.password.errors', '_page.form.password.value', '$validate.user.schema');
    model.start('$validate.user.signup.username', '_page.form.username.errors', '_page.form.username.value', '_page.form.username.found', '$validate.user.schema');
    model.start('$validate.messages', '_page.form.email.messages', '_page.form.email.errors', '_page.form.email.event', '_page.form.event', '$validate.user.rules.email');
    model.start('$validate.messages', '_page.form.password.messages', '_page.form.password.errors', '_page.form.password.event', '_page.form.event', '$validate.user.rules.password');
    model.start('$validate.messages', '_page.form.username.messages', '_page.form.username.errors', '_page.form.username.event', '_page.form.event', '$validate.user.rules.username');
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