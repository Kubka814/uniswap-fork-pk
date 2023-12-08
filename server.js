const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// app.set('trust proxy', true);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(passport.initialize());

if (process.env.NODE_ENV === 'production' || 1) {
    app.use(express.static(path.join(__dirname, './build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, './build', 'index.html'));
    });
}

let port = 15002;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
