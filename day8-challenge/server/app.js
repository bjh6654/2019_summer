var express = require('express');
var app = express();
var fs = require('fs');

app.listen(8090, function() {
    console.log("Express server has started on port 8090");
})

app.get('/', function(req, res) {
    fs.readFile('../html/log.html', function(error, data) {
        if ( error ) {
            console.log( error );
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    })
})

const data = require('./data.json');
app.get('/data.json', function(req, res) {
    res.send(data);
})