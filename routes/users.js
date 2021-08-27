const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verify = require('../middleware/verifyToken');

router.get('/test', verify, (req,res) => {
    console.log(req.user);
    User.findAll()
    .then( users => { 
        console.log(users);
        res.sendStatus(200);
    })
    .catch( err => console.log(err) );
});

module.exports = router;