/**
 * A simple ExpressJS server app
 */

'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.createServer(app);

app.get('/', function(req, res) {

    // Toggle between serving public/index.html
    // and sending a text 'Ola Mundo!' to see
    // nodemon restarting the server upon edit

    res.sendfile(path.resolve(__dirname + '/../../app/index.html'));
    //  res.send('Ola Mundo!');

});
app.get('/api', function(req, res) {
    var pg = require('pg');
    var conString = "postgres://postgres:postgres@localhost/postgres";
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * from orders', function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if (err) {
                return console.error('error running query', err);
            }
            res.setHeader('Content-Type', 'application/json');
    		res.send(JSON.stringify(result));
            //output: 1
        });
    });
});

app.use(express.static(path.resolve(__dirname + '/../..')));

server.listen(3000, 'localhost');
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
