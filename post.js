var querystring = require('querystring'),
    hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = (req, res) => {
  var body = '';
  req.on('data', function (chunk) {
    body += chunk;
    if (body.length > 1e6) {
      req.connection.destroy();
    }
  }).on('end', function () {
    let parsed = querystring.parse(body);
    if (!hasOwnProperty.call(parsed, 'name')) {
      res.statusCode = 400;
      res.end('Bad Request');
    } else {
      res.end(`Hello ${parsed.name} World!`);
    }
  });
};
