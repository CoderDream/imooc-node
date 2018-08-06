let http = require('http');
let fs = require('fs');
let request = require('request');

http.createServer(function (req, res) {
    // fs.readFile('./buffer/logo.png', function (err, data) {
    //     if(err) {
    //         res.end('file not exist!');
    //     }
    //     else {
    //         res.writeHead(200, {'Context-Type':'text/html'});
    //         res.end('data');
    //     }
    // });
    //fs.createReadStream('../buffer/logo.png').pipe(res);
    request('https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg').pipe(res);
}).listen(8090);