const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.map(file => {
    if (file.isFile()) {
      fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
        if (err) throw err;
        const fileObj = path.parse(path.join(__dirname, file.name));
        console.log(`${fileObj.name} - ${fileObj.ext.slice(1)} - ${stats.size/1000}kB`);
      });
    }
  })
})

