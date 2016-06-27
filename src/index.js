var express    = require('express')
    , fs       = require('fs')
    , http     = require('http')
    , util     = require('util')
    , path     = require('path');

// Constants
var PORT = 8080;

// App
var app = express();

/*
 * connect middleware - please note not all the following are needed for the specifics of this example but are generally used.
 */
app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/uploads' }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.static(__dirname + '/static'));
    app.use(express.errorHandler());
});

app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.get('/test', function(req, res) {
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

//File upload
app.get('/upload', imageForm);
app.post('/upload', uploadImage);

function imageForm(req, res) {
    res.render('upload', {
        title: 'Upload Images'
    });
};

function uploadImage(req, res, next){
        console.log('file info: ',req.files.image);

        //split the url into an array and then get the last chunk and render it out in the send req.
        var pathArray = req.files.image.path.split( '/' );

        var process = require('child_process');
        var alprCommand = 'alpr --json -c ' + req.body.country +' ' + req.files.image.path;
        console.log('executing ALPR', alprCommand);
        var ls = process.exec(alprCommand, function (error, stdout, stderr) {
        if(error) {
           console.log("error code", error.code);
           res.send('error code: ' + error.code + ' child response:' + stdout);
         } else {
           console.log('succesful run', JSON.stringify(stdout, null, 2));
           res.send(' child response:' + stdout);
         }
        });


        // res.send(util.format(' Task Complete \n uploaded %s (%d Kb) to %s as %s'
        //     , req.files.image.name
        //     , req.files.image.size / 1024 | 0
        //     , req.files.image.path
        //     , req.body.title
        //     , req.files.image
        //     , '<img src="uploads/' + pathArray[(pathArray.length - 1)] + '">'
        // ));
};

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
