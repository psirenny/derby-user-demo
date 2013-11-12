module.exports = function (app) {
  app.fn('user', {
    forgot: function (e) {
      alert('unimplemented');
    },
    changeEmail: function (e) {
      $.post('/user/changeEmail', e.at().get());
    },
    changePassword: function (e) {
      $.post('/user/changePassword', e.at().get());
    },
    changeUsername: function (e) {
      $.post('/user/changeUsername', e.at().get());
    },
    signin: function (e) {
      var self = this;
      $.post('/user/signin', e.at().get(), function (data) {
        self.model.set('_session.user.id', data.user.id);
        self.model.set('_session.user.isRegistered', true);
      });
    },
    signout: function (e) {
      var self = this;
      $.post('/user/signout', function (data) {
        self.model.set('_session.user.id', data.user.id);
        self.model.set('_session.user.isRegistered', false);
      });
    },
    signup: function (e) {
      var self = this;
      $.post('/user/signup', e.at().get(), function () {
        self.model.set('_session.user.isRegistered', true);
      });
    }
  });
};