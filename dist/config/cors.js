const whiteListURLS = [];
whiteListURLS.push("http://localhost:3000");
module.exports = {
    credentials: true,
    methods: 'GET,PUT,POST,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    origin: (origin, callback) => {
        //   console.log("all whitelist", whiteListURLS, origin);
        if (whiteListURLS.indexOf(origin) !== -1 || origin === undefined) {
            callback(null, true);
        }
        else {
            callback("unauthorized Domain", false);
        }
    }
};
//# sourceMappingURL=cors.js.map