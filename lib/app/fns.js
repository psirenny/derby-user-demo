module.exports = function (app) {
  app.fn('user', {
    forgot: function (e) {
      alert('unimplemented');
    },
    signin: function (e) {
      var self = this;
      $.post('/signin', e.at().get(), function (data) {
        self.model.set('_session.user.id', data.user.id);
        self.model.set('_session.user.isRegistered', true);
      });
    },
    signout: function (e) {
      var self = this;
      $.post('/signout', function (data) {
        self.model.set('_session.user.id', data.user.id);
        self.model.set('_session.user.isRegistered', false);
      });
    },
    signup: function (e) {
      var self = this;
      $.post('/signup', e.at().get(), function () {
        self.model.set('_session.user.isRegistered', true);
      });
    }
  });
};