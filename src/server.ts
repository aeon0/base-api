require('module-alias/register');

import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import router from "./router";
import logger from "./services/logger";
const moment = require('moment-timezone');
const morgan = require('morgan');


// Load environment variables
dotenv.config();

// Set default timezone for moment js
moment.tz.setDefault("Europe/Berlin"); 

// In production keep server running
if (process.env.NODE_ENV == "prod") {
    process.on('uncaughtException', err => {
        logger.error("Uncaugt Exception", { error: err });
    });
}

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.set('debug', false);
const connection_url = process.env.NODE_ENV == "test" ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;
mongoose.connect(connection_url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
    logger.info("Connected to MongoDB Successfully")
}).catch((err) => {
    logger.error("Could not connect to MongoDB", { error: err });
});


// Setup Express App
const app = express();

app.use(express.json({limit: '1000mb'}));
app.use(express.urlencoded({limit: '1000mb', extended: true}));
app.use(express.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization, jobtoken");
    next();
});
if(process.env.NODE_ENV == "prod"){
    var logPath = path.join(__dirname, '../../logs', 'api-access.log');
    app.use(morgan('short', {
        // Format (short): :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
        stream: fs.createWriteStream(logPath, {flags:'a'})
    }));
}

app.use(process.env.API_PREFIX, router);

app.listen(process.env.API_PORT);
logger.info('Server started and listening on Port: ' + process.env.API_PORT);

export default app;

// Note: navigate 2 dirs back because the js file is going to be in the build folder (ROOT/build/src/server.js)
const rootDirectory = path.join(__dirname, '../../');
export { rootDirectory };
