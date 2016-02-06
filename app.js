var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ws281x = require('rpi-ws281x-native');

var NUM_LEDS = parseInt(process.argv[2], 10) || 1,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

app.post('/', function (req, res) {
    console.log(NUM_LEDS);

    var user = req.body.user_name;

    var body = {
        response_type: "in_channel",
        text: ":badjokeeel: " + req.body.text + " from: " + user
    };

    res.send(body);
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});