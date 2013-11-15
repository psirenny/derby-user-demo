var convict = require('convict');

var conf = convict({
  email: {
    from: 'Derby User <djtorres0@gmail.com>',
    transport: {
      options: {
        auth: {
          pass: {default: '', env: 'EMAIL_PASS'},
          user: 'djtorres0@gmail.com'
        }
      },
      type: 'Mandrill'
    }
  },
  mongo: {
    options: {safe: true},
    uri: 'mongodb://localhost:27017/database'
  },
  origin: 'http://localhost:3000',
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
          clientSecret: {default: '', env: 'FACEBOOK_SECRET'}
        }
      },
      google: {
        authOptions: {
          scope: ['email', 'profile']
        },
        config: {
          clientID: '218982043470.apps.googleusercontent.com',
          clientSecret: {default: '', env: 'GOOGLE_SECRET'}
        },
        strategy: {
          module: 'passport-google-oauth',
          name: 'OAuth2Strategy',
        }
      },
      twitter: {
        config: {
          consumerKey: 'bFrkOUL1cpZwNnnxmDjFQQ',
          consumerSecret: {default: '', env: 'TWITTER_SECRET'}
        }
      }
    }
  }
});

conf.loadFile(__dirname + '/../../package.json');
module.exports = conf;