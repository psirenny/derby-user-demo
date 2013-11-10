var app = require('derby')
  .createApp(module)
  .use(require('../../ui'));

require('./fns')(app);
require('./routes')(app);