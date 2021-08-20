require('dotenv').config()

//Express
const express = require('express');
const app = express();
const session = require('express-session');

//Strategy
const discordStrategy = require('./strategies/discordstrategy')

//passport
const passport = require('passport')

//Get port
const PORT = process.env.PORT || 3001;

//Routes
const authRouter = require('./routes/auth')


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

