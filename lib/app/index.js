var app = require('derby')
  .createApp(module)
  .use(require('../../ui'));

require('./events')(app);
require('./fns')(app);
require('./user')(app);
require('./routes')(app);