var qs = require('qs');

module.exports = function (app) {
  app.fn('user', {
    changeEmail: function (e) {
      var origin = this.model.get('$config.origin');
      $.post(origin + '/user/changeEmail', e.at().get());
    },
    changePassword: function (e) {
      var origin = this.model.get('$config.origin');
      $.post(origin + '/user/changePassword', e.at().get(), function () {
        e.at().del();
      });
    },
    changeUsername: function (e) {
      var data = e.at().get()
        , body = {username: data.username.value}
        , errors = data.errors && data.errors[0]
        , origin = this.model.get('$config.origin');

      e.at().set('event', 'submit');
      if (errors) return;
      $.post(origin + '/user/changeUsername', body);
    },
    connect: {
      facebook: function (e) {
        var origin = this.model.get('$config.origin');
        $.popupWindow(origin + '/user/auth/facebook');
      },
      google: function (e) {
        var origin = this.model.get('$config.origin');
        $.popupWindow(origin + '/user/auth/google');
      },
      twitter: function (e) {
        var origin = this.model.get('$config.origin');
        $.popupWindow(origin + '/user/auth/twitter');
      }
    },
    forgotPassword: function (e) {
      var data = e.at().get()
        , body = {usernameOrEmail: data.usernameOrEmail.value}
        , errors = data.errors && data.errors[0]
        , origin = this.model.get('$config.origin');

      e.at().set('event', 'submit');
      if (errors) return;
      $.post(origin + '/user/forgotPassword', body, function () {
        e.at().del();
        e.at().set('success', true);
      });
    },
    resetPassword: function (e) {
      var data = e.at().get()
        , body = {confirmPassword: data.confirmPassword.value, password: data.password.value}
        , errors = data.errors && data.errors[0]
        , origin = this.model.get('$config.origin')
        , self = this;

      e.at().set('event', 'submit');
      if (errors) return;
      $.post(origin + '/user/resetPassword', e.at().get(), function (data) {
        self.model.set('_session.user.id', e.at().get('userId'));
        self.model.set('_session.user.isRegistered', true);
      });
    },
    signin: function (e) {
      var self = this
        , data = e.at().get()
        , body = {password: data.password.value, usernameOrEmail: data.usernameOrEmail.value}
        , errors = data.errors && data.errors[0]
        , origin = this.model.get('$config.origin');

      e.at().set('event', 'submit');
      if (errors) return;
      $.post(origin + '/user/signin', body)
        .done(function (data) {
          self.model.set('_session.user.id', data.user.id);
          self.model.set('_session.user.isRegistered', true);
        })
        .fail(function () {
          body.submitted = true;
          self.history.push('/signin?' + qs.stringify(body));
        });
    },
    signout: function (e) {
      var self = this, origin = this.model.get('$config.origin');
      $.post(origin + '/user/signout', function (data) {
        self.model.set('_session.user.id', data.user.id);
        self.model.set('_session.user.isRegistered', false);
      });
    },
    signup: function (e) {
      var self = this
        , data = e.at().get()
        , body = {email: data.email.value, password: data.password.value, username: data.username.value}
        , errors = data.errors && data.errors[0]
        , origin = this.model.get('$config.origin');

      e.at().set('event', 'submit');
      if (errors) return;
      $.post(origin + '/user/signup', body, function () {
        self.model.set('_session.user.isRegistered', true);
      });
    },
    verifyEmail: function (e) {
      var self = this, origin = this.model.get('$config.origin');
      $.post(origin + '/user/verifyEmail', e.at().get());
    }
  });
};