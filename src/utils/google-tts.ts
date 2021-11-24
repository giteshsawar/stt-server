const textToSpeech = require('@google-cloud/text-to-speech');

const fs = require('fs');
const util = require('util');
// Creates a client

const projectId = "tts-test";
const client = new textToSpeech.TextToSpeechClient({ projectId });
async function quickStart(text: String) {

  const effectsProfileId = ['handset-class-device'];

  const request = {
    input: { text: text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    // select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3', effectsProfileId },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // return response.audioContent;
  // Write the binary audio content to a local file
  console.log("writing the audio");
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');

  console.log("audio file written");
  return writeFile;
//   console.log('Audio content written to file: output.mp3');
}

export default quickStart;