const express = require('express');
const PORT = process.env.PORT || 5000;

// Connect DB
const db = require('./config/database');
db.authenticate()
    .then(() => { console.log("DB connected...") })
    .catch(err => { console.log(err) });

const app = express();

// Index route, AKA homepage
app.get('/', (req, res) => res.send("SERVER.js"));

// User routes
app.use('/api/users', require('./routes/users'));

app.listen(PORT, console.log(`Server listening on ${PORT}`));