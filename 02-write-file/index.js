const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const path = require('path').join(__dirname, 'text.txt');
const WriteStream = fs.createWriteStream(path);
const rl = readline.createInterface({ input, output });


rl.question('Здравствуйте, можете ввести текст или введите exit для завершения: ', (text) => {
  if (text == 'exit'){
    console.log('text.txt пустой');
    rl.close();
  } else {
    WriteStream.write(`${text}`);
    console.log('Текст записан, продолжайте вводить или введите exit для завершения');
    rl.on('line', (text) => {
        console.log('Текст записан, продолжайте вводить или введите exit для завершения')
      if (text == 'exit'){
        console.log('Ввод текста завершен, результат в text.txt');
        rl.close();
      } else {
        WriteStream.write(`\n${text}`);
      }
    });
  }
});

rl.on('SIGINT', () => {
    console.log('\nВвод текста завершен, результат в text.txt');
    rl.close();
  });