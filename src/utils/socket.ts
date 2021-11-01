import speechClient from "./speech";

const config = {
  encoding: "ENCODING_UNSPECIFIED",
  sampleRateHertz: 16000,
  languageCode: "en-US",
};

module.exports = function(io) {
  io.on("connection", (socket) => {
    socket.on("ping", () => {
      console.log("socket connection pinged!!!!!!!");
    });

    socket.on("stt", (data) => {
      try {
        transcribeAudio(data, (results) => {
          console.log("emitting transcription: ", results);
          socket.emit("stt", results);
        });
      } catch (e) {
        console.log(e.message);
      }
    });
  });
};

const transcribeAudio = async (audio, cb) => {
  const [response] = await speechClient.recognize({
    audio: { content: audio.replace(/^data:audio\/wav;base64,/, "") },
    config,
  });

  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  cb(transcription);
};
