var express = require('express');

// Constants
var PORT = 8080;

// App
var app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.get('/test', function(req, res) {
  var fs = require('fs');
  var process = require('child_process');
  var ls = process.exec('alpr --json -c eu /src/h786poj.jpg', function (error, stdout, stderr) {
  if(error) {
     console.log("error code", error.code);
     res.send('error code: ' + error.code + ' child response:' + stdout);
   } else {
     console.log('succesful run', JSON.stringify(stdout, null, 2));
     res.send(' child response:' + stdout);
   }
  });

});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
