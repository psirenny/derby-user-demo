var app = require('derby')
  .createApp(module)
  .use(require('../../ui'));

require('./controllerFns')(app);
require('./events')(app);
require('./user')(app);
require('./routes')(app);
require('./viewFns')(app);