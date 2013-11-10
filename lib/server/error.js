module.exports = function(app) {


  return function (err, req, res, next) {
    if (!err) return next();
    console.error(err.stack || err);
    var status = parseInt(err.message || err.toString());
    status = (status >= 400 && status < 600) ? status : 500;
    res.redirect('/' + status);
  };
};