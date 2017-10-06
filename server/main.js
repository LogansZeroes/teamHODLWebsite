var express = require('express'),
    app = express(),
    http = require('http'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    fs = require('fs'),
    // MongoClient = require('mongodb').MongoClient,
    favicon = require('serve-favicon');
    // secret = require('../server/secret.js');

// var MongoAdmin = secret.MONGOADMIN;

// MongoClient.connect(MongoAdmin, (err, database) => {
//     if (err) return console.error(err);
//     db = database;
//     app.listen(process.env.PORT || 3000, () => {
//         console.log('listening on', process.env.PORT || 3000);
//     });
// });

app.use(express.static('public'));
app.use(favicon('./public/favicon.ico'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/" + "index.html");
});

app.get('/presskit', (req, res) => {
    res.sendFile(__dirname + "/" + "presskit.html");
});

app.get('/whitepaper', function(request, response){
  var tempFile="./public/docs/HODL_whitepaper.pdf";
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
  });
});

app.get('/404', (req, res) => {
    res.sendFile(__dirname + "/" + "404.html");
});

app.get('/#', (req, res) => {
    res.sendFile(__dirname + "/" + "404.html");
});

app.use( (err, req, res, next) => {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// app.listen(process.env.PORT || 3000, function () {
//   console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
// })