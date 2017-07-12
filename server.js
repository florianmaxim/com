var express = require('express')

var app = express();

var _PORT = 5080;

app.use(express.static('build'));

app.listen(_PORT, function () {
  console.log('Listening on port '+_PORT+'!');
});
