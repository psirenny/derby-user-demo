var app = require('derby')
  .createApp(module)
  .use(require('../../ui'))
  .use(require('derby-ui-github-buttons'));

require('derby-lang').app(app);
require('derby-validate')(app);
require('derby-validate-user').app(app);
require('./controllerFns')(app);
require('./events')(app);
require('./user')(app);
require('./routes')(app);
require('./viewFns')(app);