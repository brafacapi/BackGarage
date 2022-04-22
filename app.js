const express = require('express');
const cors = require('cors');

const recursiveRoutes = require('./helpers/recursive-routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
recursiveRoutes('api', app);

module.exports = app;