const express = require('express');
const app = express();

require("express-async-errors");

require("./startups/routes")(app);
require("./startups/database")();
require("./startups/logger")();
require("./startups/jsonWebToken")();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Started and Listening")
})