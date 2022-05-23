const fs = require('fs');
const path = require('path').join(__dirname, 'text.txt');
const stream = fs.createReadStream(path);

stream.on('data', (chunk) => {
    console.log(chunk.toString())
});


