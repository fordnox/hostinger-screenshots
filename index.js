var express = require('express');
var app = express();
var fs = require('fs');
var screenshot = require('node-webkit-screenshot');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
    response.render('pages/index');
});

app.get('/w/:app', function (req, res) {
    console.log('app ' + req.params.app);
    var filename = './' + req.params.app + '.png';

    screenshot({
        url: 'https://' + req.params.app + '.000webhostapp.com',
        width: 1024,
        height: 768
    })
        .then(function (buffer) {
            fs.writeFile(filename, buffer, function () {
                // This will close the screenshot service
                screenshot.close();
                res.contentType(filename);
            });
        });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


