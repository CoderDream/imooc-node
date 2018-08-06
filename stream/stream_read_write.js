let Readable = require('stream').Readable;
let Writeable = require('stream').Writable;

let readStream = new Readable();
let writeStream = new Writeable();

readStream.push('I ');
readStream.push('Love ');
readStream.push('imooc \n ');
readStream.push(null);

writeStream._write = function (chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
};

readStream.pipe(writeStream);