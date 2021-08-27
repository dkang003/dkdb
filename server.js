const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// Connect DB
const db = require('./config/database');
db.authenticate()
    .then(() => { console.log("DB connected...") })
    .catch(err => { console.log(err) });

app.use(express.json());

// Index route, AKA homepage
app.get('/', (req, res) => res.send("SERVER.js"));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, console.log(`Server listening on ${PORT}`));