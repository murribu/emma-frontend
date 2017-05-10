const express = require('express');
const bodyParser = require('body-parser');
const getlinks = require('./getlinks');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = 8080;

app.listen(port);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
})
app.get('/dist/build.js', function(req, res){
    res.sendFile(path.join(__dirname + '/dist/build.js'));
});
app.post('/getlinks', getlinks.httpResponse)

console.log('Cory Martin\'s Frontend Emma project started on port ' + port);