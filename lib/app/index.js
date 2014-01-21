var app = require('derby')
  .createApp(module)
  .use(require('../../ui'))
  .use(require('derby-ui-github-buttons'))
  .use(require('derby-ui-photo-upload'));

require('derby-lang').app(app);
require('derby-validate')(app);
require('derby-validate-user').app(app);
require('./controllerFns')(app);
require('./events')(app);
require('./user')(app);
require('./validation')(app);
require('./viewFns')(app);
require('./routes')(app);