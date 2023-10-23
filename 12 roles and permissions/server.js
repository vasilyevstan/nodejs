const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;

// custom logger
app.use(logger);

// handle ptions credentials check - before cors
app.use(credentials);

app.use(cors(corsOptions));

// built in middleware
app.use(express.urlencoded({ extended: false }));

// json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// server statis files
app.use('/', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// after this line check JWT
app.use(verifyJWT);
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