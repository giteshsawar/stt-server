import speechClient from './speech';
import ss from 'socket.io-stream';
import quickStart from './google-tts';
import { Socket } from 'socket.io';
// const { pipeline, Readable } = require('stream');
// import { Buffer } from 'buffer';
const path = require("path");
const fs = require("fs");

const params = {
    encoding: 'WEBM_OPUS',
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

let recognizeStream;

module.exports = function(io) {
    io.on("connection", (socket) => {

        socket.on("ping", () => {
            console.log("socket connection pinged!!!!!!!");
        });

        ss(socket).on("stream-transcribe", (stream, data) => {
            transcribeAudioStream(stream, function(data) {
                console.log("got results", data.results);
                if (data && data.results[0] && data.results[0].alternatives[0]) {
                    console.log("transcript data", data.results[0].alternatives[0].transcript);
                }
                if (data.results[0] && data.results[0].isFinal) {
                    // stopRecognitionStream();
                    // console.log('restarted stream serverside');
                }
                socket.emit("results", data);
            });
        });

        socket.on("tts", async text => {
            const audio = await quickStart(text);

            const audioStream = ss.createStream();

            console.log("read the file stream");
            const audioPath = path.resolve(__dirname, '../../output.mp3');

            // if (fs.existsSync(audioPath)) {
            // const readStream = fs.createReadStream(audioPath);
    
            ss(socket).emit('tts-stream', audioStream, { name: 'output.mp3' });
            fs.createReadStream(audioPath).pipe(audioStream);
            // } else {
            //     console.log("file not found", audioPath);
            // }

            //  readStream.on('data', (data) => {
            //     console.log(typeof data);
            //     console.log('sending chunk of data', data);

                // const buffer = await blob.arrayBuffer();
            // //   // console.log("send the buffer", buffer);
                // audioStream.write(Buffer.from(data), console.log);
                // ss(socket).emit('tts-stream', audioStream);
                
            //   audioStream.write(Buffer.from(data, 'binary'), console.log);

            //  });
            // const baseAudio = Buffer.from(audio).toString('base64');

            // socket.emit("tts", baseAudio);
        });
    });
}

function stopRecognitionStream() {
    if (recognizeStream) {
        recognizeStream.end();
        recognizeStream = undefined;
    }
}

function transcribeAudioStream(audio, cb) {
    recognizeStream = speechClient.streamingRecognize(request)
    .on('data', function(data){
        console.log(data);
        cb(data);
    })
    .on('error', (e) => {
        console.log(e);
    })
    .on('end', () => {
        console.log('transcript end');
        stopRecognitionStream();
    });

    audio.pipe(recognizeStream);
    audio.on('end', function() {
        console.log('audio end');
        //fileWriter.end();
    });
};
