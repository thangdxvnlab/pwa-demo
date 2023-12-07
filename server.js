'use strict';
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var webpush = require('web-push');

webpush.setVapidDetails(
  process.env.MAIL_TO,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY,
);

var payloads = require('./payloads');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//To server static assests in root dir
app.use(express.static(__dirname));

//To allow cross origin request
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//To server index.html page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//To send public key to client
app.get('/vapid_public_key', function (req, res) {
  res.send(process.env.PUBLIC_VAPID_KEY);
});

//To receive push request from client
app.post('/send_notification', function (req, res) {
  if (!req.body || !req.body.endpoint) {
    res.status(400).send('Invalid request');
    return;
  }
  
  const pushConfig = {
    endpoint: req.body.endpoint,
    keys: {
      auth: req.body.keys.auth,
      p256dh: req.body.keys.p256dh
    }
  };

  // get random payload
  let random = Math.floor(Math.random() * payloads.length);
  let payload = payloads[random];
  
  webpush.sendNotification(pushConfig, JSON.stringify(payload))
    .then(function() {
      res.status(200);

    })
    .catch(function(error) {
      console.error(error);
      res.status(500);
    });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Local Server : http://localhost:3000');
});
