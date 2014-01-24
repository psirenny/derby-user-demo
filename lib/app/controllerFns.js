var qs = require('qs');

module.exports = function (app) {
  app.fn('photoUpload.create', function (upload) {
    var dom = upload.dom
      , edit = dom.element('edit')
      , modal = dom.element('modal');

    dom.addListener(edit, 'click', function () {
      $(modal).modal();
    });
  });

  app.fn('user', {
    changeEmail: function (e) {
      var email = e.at().get('email.value')
        , data = {email: email}
        , errors = e.at().get('errors')
        , origin = this.model.get('$config.origin');

      e.at().set('event', 'submit');
      if (errors[0]) return;
      $.post(origin + '/user/changeEmail', data);
    },
    changePassword: function (e) {
      var confirmPassword = e.at().get('confirmPassword.value')
        , password = e.at().get('password.value')
        , data = {confirmPassword: confirmPassword, password: password}
        , errors = e.at().get('errors')
        , origin = this.model.get('$config.origin');

      e.at().set('event', 'submit');
      if (errors[0]) return;
      $.post(origin + '/user/changePassword', data, function () {
        e.at().del();
      });
    },
    changeUsername: function (e) {
      var username = e.at().get('username.value')
        , data = {username: username}
        , errors = data.errors && data.errors[0]
        , origin = this.model.get('$config.origin');

      e.at().set('event', 'submit');
      if (errors[0]) return;
      $.post(origin + '/user/changeUsername', data);
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
    forgotPassword: function (e, el) {
      var usernameOrEmail = e.at().get('usernameOrEmail.value')
        , data = {usernameOrEmail: usernameOrEmail}
        , errors = e.at().get('errors')
        , origin = this.model.get('$config.origin');

      e.at().set('event', 'submit');
      if (errors) return;
      $.post(origin + '/user/forgotPassword', data, function () {
        el.reset();
        e.at().set('success', true);
      });
    },
    resetPassword: function (e) {
      var confirmPassword = e.at().get('confirmPassword.value')
        , password = e.at().get('password.value')
        , userId = e.at().get('userId')
        , data = {confirmPassword: confirmPassword, password: password}
        , errors = e.at().get('errors')
        , origin = this.model.get('$config.origin')
        , self = this;

      e.at().set('event', 'submit');
      if (errors[0]) return;
      $.post(origin + '/user/resetPassword', data, function (data) {
        self.model.set('_session.user.id', userId);
        self.model.set('_session.user.isRegistered', true);
      });
    },
    signin: function (e) {
      var self = this
        , password = e.at().get('password.value')
        , usernameOrEmail = e.at().get('usernameOrEmail.value')
        , data = {password: password, usernameOrEmail: usernameOrEmail}
        , errors = e.at().get('errors')
        , origin = this.model.get('$config.origin');

      e.at().set('event', 'submit');
      if (errors[0]) return;
      $.post(origin + '/user/signin', data)
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
    signup: function (e, el) {
      var self = this
        , email = e.at().get('email.value')
        , errors = e.at().get('errors') || []
        , origin = this.model.get('$config.origin')
        , password = e.at().get('password.value')
        , photoBlob = e.at().get('photo.image.edited.blob')
        , photoData = new FormData()
        , photoOptions = {contentType: false, data: photoData, processData: false, type: 'POST'}
        , username = e.at().get('username.value')
        , data = {email: email, password: password, username: username};

      e.at().set('event', 'submit');
      if (errors[0]) return;

      function uploadPhoto(callback) {
        if (!photo) return callback();
        photoData.append('photo', photoBlob);
        $.ajax(origin + '/user/photo/upload', photoOptions).done(callback);
      }

      uploadPhoto(function () {
        console.log('here');
        $.post(origin + '/user/signup', data, function () {
          el.reset();
          self.model.set('_session.user.isRegistered', true);
        });
      });
    },
    verifyEmail: function (e) {
      var self = this, origin = this.model.get('$config.origin');
      $.post(origin + '/user/verifyEmail', e.at().get());
    }
  });
};