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
const accessLevelRoute = require('./routes/accessLevelRoute');
const articleRoute = require('./routes/articleRoute');
const categorieRoute = require('./routes/categorieRoute');
const commandeRoute = require('./routes/commandeRoute');
const espaceRoute = require('./routes/espaceRoute');
const genreRoute = require('./routes/genreRoute');
const menuRoute = require('./routes/menuRoute');
const statutCommandeRoute = require('./routes/statutCommandeRoute');
const userRoute = require('./routes/userRoute');

const { requireAuth } = require('./middleware/authMiddleware');

app.use('/auth', authRoute);
app.use('/register', registerRoute);
app.use('/tasks', taskRoute);
app.use('/roles', accessLevelRoute);
app.use('/articles', articleRoute);
app.use('/categories', categorieRoute);
app.use('/commandes', commandeRoute);
app.use('/espaces', espaceRoute);
app.use('/genres', genreRoute);
app.use('/menus', menuRoute);
app.use('/statutCommande', statutCommandeRoute);
app.use('/users', userRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

mongoose.connect(process.env.BD_CONNECTION, ()=> {
    console.log('Connected to database');
});

app.listen(5500);