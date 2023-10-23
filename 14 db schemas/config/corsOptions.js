const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            console.log('in white list');
            callback(null, true);
        } else {
            console.log('in black list');
            console.log(whileList.indexOf(origin));
            callback(new Error('Not allowed by CORS'));
        }

        console.log(origin);
        console.log(allowedOrigins);

    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
