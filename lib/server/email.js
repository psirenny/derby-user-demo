var config = require('./config')
  , emailTemplates = require('swig-email-templates')
  , nodemailer = require('nodemailer')
  , path = require('path');

exports.send = function (options) {
  if (!options.template.name) return console.error('template name required');
  if (!options.to) return console.error('"to" property required');
  options.from = config.get('email.from');
  options.template.data = options.template.data || {};
  options.template.data.origin = config.get('origin');
  options.template.root = path.join(__dirname, '../../views/email');

  var transport = nodemailer.createTransport(
    config.get('email.transport.type'),
    config.get('email.transport.options')
  );

  emailTemplates(options.template, function (err, render) {
    if (err) return console.error(err);
    render(options.template.name + '.html', options.template.data, options.template.urlRewriteFn, function (err, html) {
      if (err) return console.error(err);
      options.html = html;
      transport.sendMail(options, function (err) {
        if (err) console.error(err);
      });
    });
  });
};