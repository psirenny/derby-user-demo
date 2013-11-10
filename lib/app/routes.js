module.exports = function (app) {
  app.get('/', function (page) {
    page.render('home');
  });

  app.get('/404', function (page) {
    page.render('404');
  });

  app.get('/forgot', function (page) {
    page.render('forgot');
  });

  app.get('/signin', function (page) {
    page.render('signin');
  });

  app.get('/signup', function (page) {
    page.render('signup');
  });
};