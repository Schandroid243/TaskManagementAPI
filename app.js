const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const authRoute = require('./routes/authRoute');
const registerRoute = require('./routes/registerRoute');
const taskRoute = require('./routes/taskRoute');

const { requireAuth } = require('./middleware/authMiddleware');

app.use('/auth', authRoute);
app.use('/register', registerRoute);
app.use('/tasks', requireAuth, taskRoute);



app.get('/', (req, res) => {
    res.send('Hello World');
});

mongoose.connect(process.env.BD_CONNECTION, ()=> {
    console.log('Connected to database');
});

app.listen(5500);