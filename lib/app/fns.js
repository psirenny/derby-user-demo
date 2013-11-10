module.exports = function (app) {
  app.fn('user', {
    signin: function (e) {
      alert('unimplemented');
    },
    signup: function (e) {
      return console.log(e.at().get());
      $.post('/signup', e.at().get(), function (data) {
        console.log('signed in');
      }).fail(function (err) {
        console.log(err);
      });
    }
  });
};