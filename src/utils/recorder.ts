import recognizeStream from './speech';
const recorder = require('node-record-lpcm16');

const sampleRateHertz = 16000;
function getText() {
  console.log("start speaking!!!");
  recorder
  .record({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '10.0',
  })
  .stream()
  .on('error', console.error)
  .pipe(recognizeStream);
}

export default getText;