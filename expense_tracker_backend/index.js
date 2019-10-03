const express = require('express');
const app = express();

require("express-async-errors");
require("./startups/cors")(app);
require("./startups/routes")(app);
require("./startups/database")();
require("./startups/logger")();
require("./startups/jsonWebToken")();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log("Started and Listening")
});

module.exports = server;