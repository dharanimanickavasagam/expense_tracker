const config = require("config");

module.exports = function () {
    if (!config.get("jwtPrivateKey")) {
        console.log("JWT not defined..");
        process.exit(1);
    }

}