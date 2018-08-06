let fs = require('fs');
let http = require('http');
let request = require('request');

http.createServer(function(req,res){
    request('https://www.imooc.com/static/img/index/logo_new.png').pipe(res);
}).listen(8090);