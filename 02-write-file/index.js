const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');
//const process = require('process');
const output = fs.createWriteStream(path.join(__dirname, 'greeting.txt'));
//const input = fs.createReadStream(path.join(__dirname, 'greeting.txt'), 'utf-8');
const rl = readline.createInterface({ input: stdin, output: stdout });
process.on('exit', () => {
  stdout.write('Bye!!');
});

stdout.write('Enter your message\n');
stdin.on('data', (data) => {
  rl.on('line', (i) => {
    if (i === 'exit') {
      stdout.write('Bye!!');
      process.exit();
    } else {
      output.write(data);
    }
  });
});
