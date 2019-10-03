const express=require('express'); 
const app = express(); 

const logger= require("../middleware/logger")
const helmet = require("helmet"); 
const morgan = require('morgan'); 
const config=require("config"); 
const appDebug = require("debug")("app:app"); 
const dbDebug = require("debug")("app:db"); 

app.use(express.json()); 
app.use(logger);
app.use(helmet())
app.use(morgan('tiny'));


appDebug("Startting app"); 
dbDebug("Starting db"); 

app.set('view engine','pug'); 

console.log("Application name : " + config.name, config.mail.host,config.mail.password)

app.listen(3000)