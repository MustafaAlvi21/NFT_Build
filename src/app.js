require("dotenv").config();


const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./utils/mongoose')
const cors = require('cors');
const { port } = require('./config/config')
const path = require('path');



// -----------------------------------
// CORS
// -----------------------------------
// Allow requests from specific origins
const corsOptions = {
  origin: [
    'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:5000', 'http://localhost:9999',
    'https://buy.test123.lol', 'https://mlm.test123.lol', 'https://admin.test123.lol', 'https://musto.test123.lol',
    'https://clonely.io', 'https://mlm.clonely.io', 'https://admin.clonely.io', 'https://team.clonely.io'
  ],
  methods: ['PUT, POST, PATCH, DELETE, GET'], // Allow only specific methods
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, pk2'], // Allow only specific headers
};


// app.use(cors(corsOptions));

app.use(cors({
  origin: function (origin, callback) {
    console.log(origin);
    if ((corsOptions.origin).includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, etc.) to be included
}));




// -----------------------------------
// MORGAN LOGGER
// -----------------------------------
app.use(morgan('dev'));


// -----------------------------------
// BODY PARSER
// -----------------------------------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// -----------------------------------
// FILE FETCHING
// -----------------------------------
app.use("/static/files/", express.static("../uploads"));




// -----------------------------------
// ROUTES
// -----------------------------------

// USERS ROUTE
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

// PACKAGES ROUTE
const packagesRoute = require('./routes/package');
app.use('/packages', packagesRoute);

// LOGS ROUTE
const logsRoute = require('./routes/logs');
app.use('/logs', logsRoute);

// PLATFORM ROUTE
const platformRoute = require('./routes/platform');
app.use('/platform', platformRoute);

// COMISSIONLEVEL ROUTE
const comissionLevelRoute = require('./routes/comissionLevel');
app.use('/comission-level', comissionLevelRoute);

// Withdraw ROUTE
const withdrawRoute = require('./routes/withdraw');
app.use('/withdraw', withdrawRoute);

// COMMISSION LOGS ROUTE
const commissionLogRoute = require('./routes/commissionLog');
app.use('/commission-log', commissionLogRoute);

// COMMISSION LOGS ROUTE
const teamMembers = require('./routes/teamMembers');
app.use('/team-members', teamMembers);

// GENERAL ROUTE
const generalData = require('./routes/generalController');
app.use('/general', generalData);




// -----------------------------------
// ERROR HANDLING
// -----------------------------------
app.use((req, res, next) => {
  // console.log('Request Origin:', req.headers.origin);
  // console.log('Request Referer:', req.headers.referer || req.headers.referrer);
  // console.log('Client IP:', req.ip);
  // console.log('Client Hostname:', req.hostname);
  
  // console.log(req);

  const error = new Error('Nothing Found Here!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
  console.log(error);
});


// module.exports = app;


app.listen(port, () => {
  console.log("Server is runnig at Port: ", port);
})
