var express = require('express');
var fs      = require('fs');

var app = express();

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/test', function(req, res) {
  res.send('hello world2')
})

app.get('/apple-app-site-association', function(req, res) {
  // Note: should use a stream here, instead of fs.readFile
  fs.readFile('./apple-app-site-association', function(err, data) {
    if(err) {
      res.send("Oops! Couldn't find that file.");
    } else {
      // set the content type based on the file
      res.contentType('application/json');
      res.send(data);
    }   
    res.end();
  }); 
});

app.get('/content/:file', function(req, res){
    fs.readFile('./files/' + req.params.file, function(err, data){
        res.contentType('application/json');
        res.write(data);
        res.end();

    });


});

app.listen(process.env.PORT || 3000);