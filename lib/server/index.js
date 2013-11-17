var app = require('../app')
  , client = require('./client')
  , config = require('./config')
  , derby = require('derby')
  , error = require('./error')
  , events = require('./events')
  , express = require('express')
  , expressApp = module.exports = express()
  , gravatar = require('derby-user-gravatar')
  , liveDbMongo = require('livedb-mongo')
  , MongoStore = require('connect-mongo')(express)
  , LocalStrategy = require('passport-local').Strategy
  , Providers = require('derby-user-providers')
  , racerBrowserChannel = require('racer-browserchannel')
  , racerHooks = require('racer-hooks')
  , Redis = require('redis')
  , User = require('derby-user');

var redis = Redis.createClient(config.get('redis.port'), config.get('redis.hostname'));
redis.select(config.get('redis.index'));

var store = derby.createStore({
  db: {db: liveDbMongo(config.get('mongo.uri') + '?auto_reconnect', config.get('mongo.options')), redis: redis}
});

var user = User(expressApp, {secretKey: config.get('secretKey')})
  , providers = Providers(expressApp, config.get('user'));

expressApp
  .use(express.favicon())
  .use(express.compress())
  .use(app.scripts(store))
  .use(express.static(__dirname + '/../../public'))
  .use(express.cookieParser())
  .use(express.session({
    secret: config.get('secretKey'),
    store: new MongoStore({
      safe: config.get('mongo.options.safe'),
      url: config.get('mongo.uri')
    })
  }))
  .use(racerBrowserChannel(store))
  .use(racerHooks(store))
  .use(store.modelMiddleware())
  .use(express.bodyParser())
  .use(express.methodOverride())
  .use(client())
  .use(user.init())
  .use(gravatar(store))
  .use(providers.init())
  .use(events(expressApp, store))
  .use(app.router())
  .use(expressApp.router)
  .use(user.routes())
  .use(providers.routes())
  .use(error(expressApp));