let fs = require('fs');

let readStream = fs.createReadStream('test.mp4');
let writeStream = fs.createWriteStream('test_stream.mp4');

readStream.on('data', function (chuck) {
    if(writeStream.write(chuck) === false) {
        console.log('still cached');
        readStream.pause();
    }
});

readStream.on('end', function () {
    writeStream.end();
});

readStream.on('drain', function () {
    console.log('data drain');

    readStream.resume();
});