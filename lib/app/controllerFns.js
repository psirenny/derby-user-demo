module.exports = function (app) {
  app.fn('user', {
    forgot: function (e) {
      alert('unimplemented');
    },
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
      var origin = this.model.get('$config.origin');
      $.post(origin + '/user/changeUsername', e.at().get());
    },
    signin: function (e) {
      var self = this, origin = this.model.get('$config.origin');
      $.post(origin + '/user/signin', e.at().get(), function (data) {
        self.model.set('_session.user.id', data.user.id);
        self.model.set('_session.user.isRegistered', true);
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
      var self = this, origin = this.model.get('$config.origin');
      $.post(origin + '/user/signup', e.at().get(), function () {
        self.model.set('_session.user.isRegistered', true);
      });
    }
  });
};