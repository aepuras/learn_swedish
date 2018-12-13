const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const express = require('express');

const router = new express.Router();

router.get('/words', (req, res) => {
    getUserData('words', req, res);
});

function getUserData(name, req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token);
    const userId = decoded.sub;
    User.findById(userId, (userErr, user) => {
        if(userErr || !user) {
            res.status(401).json({
                error: "No user"
            });
        } else {
            res.status(200).json({
                items: user[name]
            })
        }
    })
}

module.exports = router;
