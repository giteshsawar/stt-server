import speechClient from './speech';
import ss from 'socket.io-stream';
// const { pipeline, Readable } = require('stream');
// import { Buffer } from 'buffer';
// const path = require("path");
// const fs = require("fs");

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
    interimResults: false,
};

let recognizeStream;

module.exports = function(io) {
    io.on("connection", (socket) => {

        socket.on("ping", () => {
            console.log("socket connection pinged!!!!!!!");
        });

        ss(socket).on("stream-transcribe", (stream, data) => {
            // console.log("socket connection pinged!!!!!!!", stream);
            // const filename = path.basename(data.name);
            // stream.pipe(fs.createWriteStream(filename));
            // socket.emit("data_received", {});
            // stream.pipe(process.stdout)
            stream.on('readable', function () {
                let data;

                while (data = this.read()) {
                    console.log(data);
                }
            })
            // transcribeAudioStream(stream ,{})

            // transcribeAudioStream(stream, function(data) {
            //     // console.log("got results", results);
            //     if (data && data.results[0] && data.results[0].alternatives[0]) {
            //         console.log("transcript data", data.results[0].alternatives[0].transcript);
            //     }
            //     if (data.results[0] && data.results[0].isFinal) {
            //         stopRecognitionStream();
            //         // console.log('restarted stream serverside');
            //     }
            //     socket.emit("results", data);
            // });

            // const dataBuffer = Buffer.from(stream, 'base64');
            // const fileStream = fs.createWriteStream('finalaudio.wav', {flags: 'a'});
            // fileStream.write(dataBuffer);

            // const readStream = fs.createReadStream(dataBuffer).pipe(recognizeStream);

            // recognizeStream.write(fileStream);
            // stream.pipe(recognizeStream);
            // pipeline(readableStream, recognizeStream);
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
    // console.log("recogninze strem", recognizeStream);
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
