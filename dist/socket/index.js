module.exports = function (io) {
    io.on("connection", (socket) => {
        // console.log("socket connection done", socket);
        // ...
        socket.on("ping", () => {
            console.log("socket connection pinged!!!!!!!!!!");
            // ...
        });
    });
};
//# sourceMappingURL=index.js.map