const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom logger
app.use(logger);

// cross origin resource sharing
const whileList = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];

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
app.use(cors(corsOptions));

// built in middleware
app.use(express.urlencoded({ extended: false }));

// json
app.use(express.json());

// server statis files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not found"});
    } else {
        res.type('txt').send("404 Not found");
    }

})

// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// })

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server runnoing on port ${PORT}`));