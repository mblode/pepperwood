const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    errorhandler = require('errorhandler');

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// connect to DB

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

// Models
require('./models/scheduleModel');
require('./models/userModel');

// Authentication
require('./config/passport');

// Routes
app.use('/schedules', require('./routes/scheduleRouter'));
app.use('/user', require('./routes/userRouter'));

app.get('/', (req, res) => {
    res.send(`
        <h1>Pepperwood</h1>
        <ul>
            <li><a href="/schedules">Schedules</a></li>
            <li><a href="/user">User</a></li>
        </ul>
    `);
});

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(errorhandler());

    app.use(function (err, req, res, next) {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 5000, function () {
    console.log('Listening on port ' + server.address().port + '. Open http://localhost:' + server.address().port);
});
