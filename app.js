const webRoutes = require('./routes/webroutes');
const express = require('express');
const path = require('path');
const app = express();

// Middleware untuk file statis
app.use(express.static(path.join(__dirname, '../client/public')));
// Routing web
app.use('/', webRoutes);

module.exports = app;