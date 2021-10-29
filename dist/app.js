"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const corsConfig = require("./config/cors");
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsConfig));
const port = 3001;
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: corsConfig
});
require("./socket")(io);
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
server.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map