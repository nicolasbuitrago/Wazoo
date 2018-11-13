const express = require("express");
const router = express.Router();

const User = require('../models/user.js');

router.post("/", (req,res) => {
    const credentials = req.body.credentials;
    User.findOne({  email: credentials.email }).then(user => {
        if(user && user.isValidPassword(credentials.password)){
            res.json({ user: user.toAuthJSON() });
        }else{
            res.status(400).json({ errors: {global: 'Invalid credentials'}});
        }
    });
});

module.exports = router;
