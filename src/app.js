require('dotenv').config()

//Express
const express = require('express');
const app = express();
const session = require('express-session');

//Strategy
const discordStrategy = require('./strategies/discordstrategy')

//passport
const passport = require('passport')


//Database
const db = require('./database/database')

//Get port
const PORT = process.env.PORT || 3001;

//Routes
const authRouter = require('./routes/auth')


db.then(() => console.log("Connected to database")).catch(() => console.log("Error connecting to database"))



app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false
}))

//Middleware
app.use('/auth', authRouter);

//Passport code
app.use(passport.initialize())
app.use(passport.session())



app.listen(PORT, () => {
    console.log("Now listening to " + PORT);
});

