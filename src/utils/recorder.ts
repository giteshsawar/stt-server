import speechClient from './speech';
const recorder = require('node-record-lpcm16');


const params = {
  encoding: 'LINEAR16',
  sampleRateHertz: 16000,
  languageCode: 'en-US'
  // streamingLimit: 290000
};

const config = {
  encoding: params.encoding,
  sampleRateHertz: params.sampleRateHertz,
  languageCode: params.languageCode,
};

const request = {
  config,
  interimResults: true,
};

const recognizeStream = speechClient.streamingRecognize(request)
.on('data', function(data){
  if (data && data.results[0] && data.results[0].alternatives[0]) {
    console.log("transcript data", data.results[0].alternatives[0].transcript);
  }
    // cb(data);
})
.on('error', (e) => {
    console.log(e);
})
.on('end', () => {
    console.log('transcript end');
    // stopRecognitionStream();
});

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