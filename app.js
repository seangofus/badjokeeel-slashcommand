var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ws281x = require('rpi-ws281x-native');

var NUM_LEDS = parseInt(process.argv[2], 10) || 1,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

function startUpShutDown (process, colorString) {
    if (null !== colorString) {
        var colorArray = colorString.split(colorString);
    }

    pixelData[0] = color(0, 0, 0);
    ws281x.render(pixelData);

    if ('startup' === process) {
        pixelData[0] = color(colorArray[0], colorArray[1], colorArray[2]);
        ws281x.render(pixelData);
    }

    if ('shutdown' === process) {
        pixelData[0] = color(0, 0, 0);
        ws281x.render(pixelData);
        ws281x.reset();
    }
}

app.post('/', function (req, res) {
    var user = req.body.user_name;
    var color = '0,153,255';
    if ('sean' === user) {
        var color = '255,0,255';
    }

    var body = {
        response_type: "in_channel",
        text: ":badjokeeel: " + req.body.text + " from: " + user
    };

    res.send(body);
    startUpShutDown('startup', color);
    setTimeout(function() {
        startUpShutDown('shutdown', null);
    }, 5000);
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});