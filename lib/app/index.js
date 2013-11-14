var app = require('derby')
  .createApp(module)
  .use(require('../../ui'))
  .use(require('derby-ui-github-buttons'));

require('./controllerFns')(app);
require('./events')(app);
require('./user')(app);
require('./routes')(app);
require('./viewFns')(app);