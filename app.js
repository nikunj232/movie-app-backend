const express = require('express')
const app = express();
const cors = require('cors');
// const router = require('./src/routes');
const routes = require("./src/routes");
const { errorHandler, errorConverter } = require('./src/middleware/error');
const passport = require('passport');
const { jwtStrategy } = require('./src/config/passport');

const allowedOrigins = ['https://your-domain.com', 'http://localhost:3001']; // Replace with your allowed origins

const corsOptions = {
  origin: ["*"],
  optionsSuccessStatus: 200, // Optional: Code to send for preflight requests
  methods: 'GET,POST,PUT,DELETE', // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] // Allowed headers
}; 
// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
app.use("/v1", routes);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use(errorConverter)
app.use(errorHandler)
module.exports = app