const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
   credentials: true,
   origin: 'http://localhost:5173',
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   preflightContinue: false,
   optionsSuccessStatus: 204,
 };

app.use(cors(corsOptions));
app.use(router);

module.exports = app;
