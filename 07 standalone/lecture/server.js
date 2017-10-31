var express = require('express')
var app = express()
var path    = require("path");

 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/number', function (req, res) {
  res.send('4');
})

app.get('/index.html', function (req, res) {
   res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/app.manifest', function (req, res) {
   res.sendFile(path.join(__dirname+'/app.manifest'));
})
 
app.listen(3000)

console.log("Running at Port 3000");