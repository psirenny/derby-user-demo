var convict = require('convict');

var conf = convict({
  cloudinary: {
    apiKey: {
      default: '',
      env: 'CLOUDINARY_API_KEY'
    },
    apiSecret: {
      default: '',
      env: 'CLOUDINARY_API_SECRET'
    },
    cloudName: {
      default: '',
      env: 'CLOUDINARY_CLOUD_NAME'
    }
  },
  email: {
    transport: {
      options: {
        auth: {
          pass: {
            default: '',
            env: 'EMAIL_PASS'
          },
          user: {
            default: '',
            env: 'EMAIL_USER'
          }
        }
      },
      type: {
        default: 'SMTP',
        env: 'EMAIL_TYPE'
      }
    }
  },
  environment: {
    default: 'development',
    env: 'NODE_ENV'
  },
  hostname: {
    default: 'localhost',
    env: 'HOSTNAME'
  },
  mongo: {
    database: {
      default: 'derbyuser',
      env: 'MONGO_DATABASE'
    },
    hostname: {
      default: 'localhost',
      env: 'MONGO_HOSTNAME'
    },
    options: {
      safe: true
    },
    port: {
      default: 27017,
      env: 'MONGO_PORT',
      type: 'port'
    }
  },
  port: {
    default: 3000,
    env: 'PORT',
    format: 'port'
  },
  protocol: {
    default: 'http',
    env: 'PROTOCOL'
  },
  redis: {
    hostname: {
      default: '127.0.0.1',
      env: 'REDIS_HOSTNAME'
    },
    index: {
      default: 1,
      env: 'REDIS_INDEX'
    },
    options: {
      auth_pass: {
        default: '',
        env: 'REDIS_PASSWORD'
      }
    },
    port: {
      default: 6379,
      env: 'REDIS_PORT',
      format: 'port'
    }
  },
  secretKey: {
    default: 'App Secret',
    env: 'SECRET_KEY'
  },
  user: {
    photo: {
      size: 200
    },
    providers: {
      facebook: {
        authOptions: {
          display: 'popup',
          scope: ['email']
        },
        config: {
          clientID: {
            default: '',
            env: 'FACEBOOK_CLIENT_ID'
          },
          clientSecret: {
            default: '',
            env: 'FACEBOOK_CLIENT_SECRET'
          }
        }
      },
      google: {
        authOptions: {
          scope: ['email', 'profile']
        },
        config: {
          clientID: {
            default: '',
            env: 'GOOGLE_CLIENT_ID'
          },
          clientSecret: {
            default: '',
            env: 'GOOGLE_CLIENT_SECRET'
          }
        },
        strategy: {
          module: 'passport-google-oauth',
          name: 'OAuth2Strategy',
        }
      },
      twitter: {
        config: {
          consumerKey: {
            default: '',
            env: 'TWITTER_CONSUMER_KEY'
          },
          consumerSecret: {
            default: '',
            env: 'TWITTER_CONSUMER_SECRET'
          }
        }
      }
    }
  },
  webport: {
    default: process.env.PORT || 3000,
    env: 'WEB_PORT'
  }
});

conf.load({
  email: {
    from: 'Derby User <' + conf.get('email.transport.options.auth.user') + '>'
  },
  mongo: {
    url: 'mongodb://' + conf.get('mongo.hostname') + ':' + conf.get('mongo.port') + '/' + conf.get('mongo.database')
  },
  origin: conf.get('protocol') + '://' + conf.get('hostname') + ':' + conf.get('webport')
});

conf.loadFile(__dirname + '/../../package.json');
module.exports = conf;