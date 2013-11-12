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
        authOptions: {
          scope: ['email']
        },
        config: {
          clientID: '219280624912532',
          clientSecret: 'a2e71da88064b5cbf072bf9c07a0063b'
        }
      },
      google: {
        authOptions: {
          scope: ['email', 'profile']
        },
        config: {
          clientID: '218982043470.apps.googleusercontent.com',
          clientSecret: '1UaFPJ0jnP3sTEbiWL6S9j5a'
        },
        strategy: {
          module: 'passport-google-oauth',
          name: 'OAuth2Strategy',
        }
      },
      twitter: {
        config: {
          consumerKey: 'bFrkOUL1cpZwNnnxmDjFQQ',
          consumerSecret: 'ZGcXGnoyPyNYSYlknBFeuvZX41evFSwfG4m3cp0'
        }
      }
    }
  }
});

conf.loadFile(__dirname + '/../../package.json');
module.exports = conf;