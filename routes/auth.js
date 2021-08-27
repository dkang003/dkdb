const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registrationValidation, loginValidation } = require('../config/validation');

router.post('/register', async (req,res) => {
    const { error } = registrationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const foundUser = await User.findOne({ email: req.body.email });

    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(req.body.password, salt);

    if (!foundUser) {
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPw
        });

        try {
            const savedUser = await user.save();
            res.json({
                saved: true,
                firstname: savedUser.firstname,
                lastname: savedUser.lastname,
                email: savedUser.email
            });
        } catch(err) {
            res.status(400).send(err);
        }
    } else {
        res.status(400).send("User already exists");
    }
});

router.post('/login', async (req,res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) return res.status(400).send("Invalid credentials");

    const validPassword = await bcrypt.compare(req.body.password, foundUser.password);
    if (!validPassword) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: foundUser.id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;