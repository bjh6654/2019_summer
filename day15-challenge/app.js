const express = require('express');
const app = express();
const fs = require('fs');
const cheerio = require('cheerio');

app.listen(9000, function() {
    console.log("Express server has started on port 9000");
})

app.get('/', function(req, res) {
    fs.readFile('./dash.html', function(error, data) {
        if ( error ) {
            console.log( error );
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    })
})

app.route(/^\/.*$/).all(function(req, res) {
    fs.readFile('./dash.html', function(error, data) {
        if ( error ) {
            console.log( error );
        } else {
            const name = req.path.toString().slice(1);
            if ( name != "favicon.ico" ) {
                var $ = cheerio.load(data.toString());
                const content = $(`#${name}`).text().replace(/\[/gi, "</br>[");
                res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
                res.end(content);
            }
        }
    })
})