let fs = require('fs');

fs.createReadStream('test.mp4').pipe(fs.createWriteStream('test-pipe.mp4'));