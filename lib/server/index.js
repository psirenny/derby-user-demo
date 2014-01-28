var app = require('../app')
  , client = require('./client')
  , config = require('./config')
  , derby = require('derby')
  , error = require('./error')
  , events = require('./events')
  , express = require('express')
  , expressApp = module.exports = express()
  , gravatar = require('derby-user-gravatar')
  , lang = require('derby-lang').server()
  , liveDbMongo = require('livedb-mongo')
  , MongoStore = require('connect-mongo')(express)
  , providers = require('derby-user-providers')(expressApp, config.get('user'))
  , racerBrowserChannel = require('racer-browserchannel')
  , racerHooks = require('racer-hooks')
  , Redis = require('redis')
  , routes = require('./routes')
  , user = require('derby-user').server(expressApp, config.get('user'))
  , validateUser = require('derby-validate-user').server(expressApp, config.get('user'))
  , validateUserLang = require('derby-validate-user-lang').server(expressApp);

var redis = Redis.createClient(config.get('redis.port'), config.get('redis.hostname'), config.get('redis.options'));
redis.select(config.get('redis.index'));

var store = derby.createStore({
  db: {db: liveDbMongo(config.get('mongo.url') + '?auto_reconnect', config.get('mongo.options')), redis: redis}
});

expressApp
  .use(express.compress())
  .use(app.scripts(store))
  .use(express.static(__dirname + '/../../public'))
  .use(express.cookieParser())
  .use(express.session({
    secret: config.get('secretKey'),
    store: new MongoStore({
      safe: config.get('mongo.options.safe'),
      url: config.get('mongo.url')
    })
  }))
  .use(racerBrowserChannel(store))
  .use(racerHooks(store))
  .use(store.modelMiddleware())
  .use(express.bodyParser())
  .use(express.methodOverride())
  .use(lang.init())
  .use(client())
  .use(user.init())
  .use(validateUser.init())
  .use(validateUserLang())
  .use(lang.build())
  .use(gravatar(store))
  .use(providers.init())
  .use(events(expressApp, store))
  .use(app.router())
  .use(expressApp.router)
  .use(validateUser.routes())
  .use(user.routes())
  .use(providers.routes())
  .use(routes(expressApp))
  .use(error(expressApp));