var cloudinary = require('cloudinary')
  , config = require('./config');

module.exports = function (app) {
  app.post('/user/photo/upload', function (req, res, next) {
    var model = req.getModel()
      , photo = req.files.photo
      , userId = req.session.user.id
      , $user = model.at('usersPublic.' + userId);

    if (!photo) return res.json(400, {error: 'missing photo'});
    $user.fetch(function (err) {
      if (err) return res.json(500, {error: err});

      cloudinary.config({
        api_key: config.get('cloudinary.apiKey'),
        api_secret: config.get('cloudinary.apiSecret'),
        cloud_name: config.get('cloudinary.cloudName')
      });

      cloudinary.uploader.upload(photo.path, function (data) {
        $user.set('local.photo', data.url);
        res.send();
      });
    });
  });

  return function (req, res, next) {
    next();
  }
};