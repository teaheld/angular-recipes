const express = require('express');
// Creating Express.js app
const app = express();

const connectToDB = require('./configurations/database');
// Connecting to the DB
connectToDB();

// This middleware is for using req.body
app.use(express.json({ extended: false }));

// Cors Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'OPTIONS, GET, POST, PUT, PATCH, DELETE, '
        );

        return res.status(200).json({});
    }

    next();
});

const recipesRoute = require('./routes/recipes');
// Setting up routes
app.use('/recipes', recipesRoute);

const notFound = require('./middlewares/not-found'),
    methodNotAllowed = require('./middlewares/method-not-allowed'),
    errorHandler = require('./middlewares/error-handler');
// Get non existing routes
app.get('/*', notFound);
// Any other request
app.use(methodNotAllowed);
// Handling all errors
app.use(errorHandler);


module.exports = app;