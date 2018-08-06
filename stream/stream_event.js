let fs = require('fs');

let readStream = fs.createReadStream('stream_copy_logo.js');

let n = 0;

readStream
    .on('data', function (chuck) {
        n++;
        console.log('data emits');
        console.log(Buffer.isBuffer(chuck));
        // console.log(chuck.toString('utf8'));

        readStream.pause();
        console.log('data pause');
        setTimeout(function () {
            console.log('data pause end');
            readStream.resume();
        }, 3000);
    })
    .on('readable', function () {
        console.log('data readable');
    })
    .on('end', function () {
        console.log(n);
        console.log('data end');
    })
    .on('close', function () {
        console.log('data close');
    })
    .on('error', function (e) {
        console.log('data read error: ' + e);
    });