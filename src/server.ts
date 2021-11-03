import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import cors from 'cors';
const path = require('path');

import quickStart from './utils/google-tts';
// import getText from './utils/recorder';

require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

const corsConfig = require("./config/cors");

const app = express();
app.use(cors(corsConfig));

const port = 3001;

const server = createServer(app);
const io = new Server(server, {
  cors: corsConfig
});

require("./utils/socket")(io);

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

server.listen(port, () => {
  console.log(`server is listening on ${port}`);
  // getText();
  // quickStart();
});