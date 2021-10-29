
const speech = require('@google-cloud/speech').v1p1beta1;

const projectId = "hoorystt";
const client = new speech.SpeechClient({ projectId });

const streamError = err => {
    console.log("error processing stream", err);
}

// const recognizeStream = client.streamingRecognize(request).on('error', streamError).on('end', () => {
//     console.log('on end');
//   }).on('data', data => {
//     console.log("got data", data);
// process.stdout.write(
//   data.results[0] && data.results[0].alternatives[0]
//     ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
//     : '\n\nReached transcription time limit, press Ctrl+C\n'
// )
// });

export default client;