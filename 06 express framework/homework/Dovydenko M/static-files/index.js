var express = require("express");
var path    = require('path');
var app     = express();

const mime = require('mime');

// static working directory set up
app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function (req, res) {
  res.set('Content-Type', mime.lookup(path));
})

// вызов, который предположительно должен обрабатывать любой запрашиваемый
// файл (путь) в static директории, но что с ним, что без него функционал
// остается тем же - запрашиваемый файл просто скачивается/ открывается
// в браузере.

app.listen(3000);
console.log('Server running at localhost:3000');
console.log('try GET:');
console.log('         sample.txt');
console.log('         sample.docx');
console.log('         sub/sample.xlsx');
console.log('         sub/brown.pdf');
