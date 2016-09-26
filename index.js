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
    var app = req.params.app;
    var filename = './tmp/' + app + '.png';
    console.log('file:  ' + filename);

    screenshot({
        url: 'http://' + app + '.000webhostapp.com',
        width: 1024,
        height: 768
    })
        .then(function (buffer) {
            console.log('screenshot done');
            fs.writeFile(filename, buffer, function (err) {
                console.log('writing file');
                if (err) throw err;
                console.log('It\'s saved!');
                // This will close the screenshot service
                screenshot.close();
                res.contentType(filename);
            });
        });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


