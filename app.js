const webRoutes = require('./routes/webroutes');
const path = require('path');
const express = require('express');
const app = express();

// Middleware untuk file statis
app.use(express.static(path.join(__dirname, '../client/public')));

// Routing web
app.use('/', webRoutes);

module.exports = app;