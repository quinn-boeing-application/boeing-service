var http = require('http'),
    querystring = require('querystring');

module.exports = {
  'can GET /*': function () {
    return new Promise((resolve, reject) => {
      http.request({
        host: 'localhost',
        port: '8888',
        method: 'GET',
        path: '/',
      }, function (res) {
        res.on('error', function (e) {
          reject(e);
        });
        var body = '';
        res.on('data', function (chunk) {
          body += chunk;
        });
        res.on('end', function () {
          if (res.statusCode !== 200) {
            reject(new Error(`res.statusCode !== 200: ${res.statusCode}`));
          } else if (body !== 'Hello World!') {
            reject(new Error(`body !== 'Hello World!': ${body}`));
          } else {
            resolve();
          }
        });
      }).on('aborted', function () {
        reject(new Error('request was aborted by server'));
      }).end();
    });
  },
  'can POST /*': function () {
    return new Promise((resolve, reject) => {
      http.request({
        host: 'localhost',
        port: '8888',
        method: 'POST',
        path: '/',
      }, function (res) {
        res.on('error', function (e) {
          reject(e);
        });
        var body = '';
        res.on('data', function (chunk) {
          body += chunk;
        });
        res.on('end', function () {
          if (res.statusCode !== 200) {
            reject(new Error(`res.statusCode !== 200: ${res.statusCode}`));
          } else if (body !== 'Hello John Smith World!') {
            reject(new Error(`body !== 'Hello John Smith World!': ${body}`));
          } else {
            resolve();
          }
        });
      }).on('aborted', function () {
        reject(new Error('request was aborted by server'));
      }).end(querystring.stringify({
        name: 'John Smith',
      }));
    });
  },
};
