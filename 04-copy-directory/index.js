const fs = require('fs');
const path = require('path');

const newDirectoryPath = path.join(__dirname, 'files-copy');
const directoryPath = path.join(__dirname, 'files');

fs.mkdir(newDirectoryPath, { recursive: true }, (err) => {
  if (err) {
    console.log(err)
    return;
  }
})

fs.readdir(newDirectoryPath, (err, files) => {
  if(err) {
    throw err
  }
  files.forEach(el=>{
    fs.unlink(`${newDirectoryPath}/${el}`, err => {
      if(err) throw err; 
   });
  })
});



fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log(err)
    return;
  }
  files.forEach(element => {
    fs.copyFile(`${directoryPath}/${element}`, `${newDirectoryPath}/${element}`,(err)=>{
        if(err) console.log(err)
    });
  });
})

