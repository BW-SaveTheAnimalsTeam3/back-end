const bcrypt = require('bcryptjs');
const express = require('express');

const router = express.Router();

const users = require('./usersModel.js');

router.post('/createNewUser', (req, res) => {
    // let user = req.body;

    // const hash = bcrypt.hashSync(user.password, 12);
    // user.password = hash;

    users.addUser(req.body)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

router.get('/', (req, res) => {
    users.findUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get users'})
        })
})

module.exports = router;