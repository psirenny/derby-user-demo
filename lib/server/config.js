var convict = require('convict');

var conf = convict({
  mongo: {
    options: {safe: true},
    uri: 'mongodb://localhost:27017/database'
  },
  redis: {
    hostname: '127.0.0.1',
    index: 1,
    port: '6379'
  },
  secretKey: 'YOUR SECRET KEY'
});

conf.loadFile(__dirname + '/../../package.json');
module.exports = conf;