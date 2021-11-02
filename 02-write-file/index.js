const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');
const output = fs.createWriteStream(path.join(__dirname, 'greeting.txt'));
const rl = readline.createInterface({ input: stdin, output: stdout });
process.on('exit', () => {
  stdout.write('Bye!!');
});

stdout.write('Enter your message\n');

rl.on('line', (i) => {
  if (i === 'exit') {
    process.exit();
  } else {
    output.write(`${i}\r\n`);
  }
});
