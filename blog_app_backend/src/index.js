require("./globals/global_functions");
require('dotenv').config();
//--------DB Conectivity-----------
require('./db/mongoose');

//-------------Express Server App-----------------
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 8000;

//---------Assign all routes to a single variable-------------------
const apiRoutes = require("./routes");

app.use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(morgan("dev"))

//CORS Configuration
const whitelist = ['http://example1.com', 'http://localhost:3000']
const corsOptions = {
    credentials: true,
    origin: ((origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }),
    methods: ['GET, POST, PUT, PATCH, DELETE']
}
app.use(cors(corsOptions));

// Pass values in header
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Register our REST API Routes.
app.use('/api/v1', apiRoutes)

// // catch 404 Error
app.use(function (req, res) {
    return notFoundError(res, { errors: [ { message: "Not Found Error" } ] })
});

app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`)
});