require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const authRouter = require('./routes/auth')

app.use('/auth', authRouter);



app.listen(PORT, () => {
    console.log("Now listening to " + PORT);
});

