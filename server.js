'use strict';

var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var http            = require('http').Server(app);
var MongoClient     = require('mongodb').MongoClient
var mongoose        = require('mongoose');
var File            = require('./public/models/file.js');


// var io              = require("socket.io")(http);

// var sass             = require('node-sass');
// var sassMiddleware   = require('node-sass-middleware');



app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/layout.html')
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(sassMiddleware({
//         src: __dirname + '/public/sass',
//         dest: __dirname + '/public/stylesheets',
//         debug: true,
//         outputStyle: 'compressed',
//         prefix:  '/stylesheets'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
// }));

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });
//
// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

// Router API

var router = express.Router();
router.route('/files')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var file = new File();      // create a new instance of the Bear model
        file.name = req.body.name;
        file.message = req.body.message;  // set the bears name (comes from the request)

        // save the bear and check for errors
        file.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'File created!' });
        })
    })
    .get(function(req, res) {
        File.find(function(err, files) {
            if (err)
                res.send(err);

            res.json(files);
        });
    });

app.use('/api', router);


var db
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/files', (err, database) => {
  if (err) return console.log(err)
  db = database
  http.listen(port, function(){
      console.log("Listening on port " + port)
  });
})
