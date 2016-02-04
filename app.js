var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    var user = req.body.user_name;

    var body = {
        response_type: "in_channel",
        text: ":badjokeeel: " + req.body.text
    };

    res.send(body);
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});