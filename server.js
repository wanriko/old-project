var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname,'dist')));

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});

var server = app.listen(80,function(){
    var port = server.address().port;
   console.log("server running at port 80"); 
});