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
  secretKey: 'YOUR SECRET KEY',
  user: {
    providers: {
      facebook: {
        options: {
          clientID: '219280624912532',
          clientSecret: 'a2e71da88064b5cbf072bf9c07a0063b'
        }
      }
    }
  }
});

conf.loadFile(__dirname + '/../../package.json');
module.exports = conf;