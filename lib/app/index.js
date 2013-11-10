var app = require('derby')
  .createApp(module)
  .use(require('../../ui'));

require('./fns');

app.get('/', function (page) {
  page.render('home');
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