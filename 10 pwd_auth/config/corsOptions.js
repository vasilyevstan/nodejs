// cross origin resource sharing
const whileList = [
    'https://www.yoursite.com', 
    'http://127.0.0.1:5500', 
    'http://localhost:3500'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whileList.indexOf(origin) !== -1 || !origin) {
            console.log('in white list');
            callback(null, true);
        } else {
            console.log('in black list');
            console.log(whileList.indexOf(origin));
            callback(new Error('Not allowed by CORS'));
        }

        console.log(origin);
        console.log(whileList);

    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
