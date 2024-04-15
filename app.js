// Load your environment variables.
require('dotenv').config()


// Database initialization and connection check.
const pg = require("./database/postgres")
pg.checkConnection(); // TODO: Check it's correctness

// Setup express app configuration and middlewares.
const express = require('express');
const app = express();
app.use(express.json());

// Routers for APIs

const authRouter = require('./routes/auth')
const serverRouter = require('./routes/server')
const requestRouter = require('./routes/request')


app.use("/auth", authRouter)
app.use("/server", serverRouter)
app.use("/request", requestRouter)


var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Listening at %s:%s', host, port);
});
