var express = require("express");
var path    = require('path');
var app     = express();

// static working directory set up
app.use(express.static(path.join(__dirname, 'public')));

app.get('/sample.txt', function (req, res) {
  res.set('Content-Type', 'text/plain');
})
app.get('/sample.docx', function (req, res) {
  res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
})
app.get('/brown.pdf', function (req, res) {
  res.set('Content-Type', 'application/pdf');
})

// понимаю, что параметр запроса Content-Type нужно обрабатывать
// по имени любого запрашиваемого файла, но мне пока не удается
// обратиться к req.path элементу

app.listen(3000);
console.log('Server running at localhost:3000');
console.log('try GET:');
console.log('         sample.txt');
console.log('         sample.docx');
console.log('         brown.pdf');
