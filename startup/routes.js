const express = require('express');
const Examples = require('../routes/ExamplesRoutes');
const error = require('../middleware/error')
const helmet = require('helmet');
const logger = require('../middleware/logger');

module.exports = function (app) {
    app.set('view engine', 'jade');
    app.set('views', './views');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('./public'));
    app.use(helmet());
    app.use(logger);
    app.use(express.json());
    console.log("startups");
    
    app.use('/api/examples/', Examples);
    app.use(error);
}