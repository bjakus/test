var express = require('express');
var fs      = require('fs');

var app = express();

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/apple-app-site-association', function(req, res) {
  // Note: should use a stream here, instead of fs.readFile
  fs.readFile('./' + req.params.file, function(err, data) {
    if(err) {
      res.send("Oops! Couldn't find that file.");
    } else {
      // set the content type based on the file
      res.contentType('application/pkcs7-mime');
      res.send(data);
    }   
    res.end();
  }); 
});

app.get('/content/:file', function(req, res){
    fs.readFile('./files/' + req.params.file, function(err, data){
        res.contentType('application/pkcs7-mime');
        res.write(data);
        res.end();

    });


});

app.listen(process.env.PORT || 3000);