const path = require('path');
const fs = require('fs');

const styles = path.join(__dirname, 'styles');
const projectDistFolder = path.join(__dirname, 'project-dist');
const bundleCss = path.join(projectDistFolder, 'bundle.css');

fs.writeFile(bundleCss, '', (err) => {
    if (err){
        console.log(err)
    }
})

fs.readdir(styles, {withFileTypes:true}, (err,files)=>{
    if(err){
        console.log(err)
    }
    files.forEach(el=>{
        if(el.isFile() && path.extname(el.name) === '.css'){
            fs.readFile(path.join(styles, el.name), 'utf-8', (err,data) => {
                if(err){
                    console.log(err)
                }
                fs.appendFile(bundleCss, data , (err)=>{
                    if(err) throw err
                })
            })
            
        }
    })
})