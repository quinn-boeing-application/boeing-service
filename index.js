const routes = {
  GET: require('./get.js'),
  POST: require('./post.js'),
};

require('http').createServer((req, res) => {
  let method = req.method;
  if (!routes.hasOwnProperty(method)) {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  } else {
    routes[method](req, res);
  }
}).on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
}).listen(8888);
