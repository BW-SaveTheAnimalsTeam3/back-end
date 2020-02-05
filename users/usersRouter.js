const bcrypt = require('bcryptjs');
const express = require('express');
const users = require('./usersModel.js');
const router = express.Router();



router.post('/register', (req, res) => {
    const creds = req.body;

    // const hash = bcrypt.hashSync(creds.password, 12);
    // creds.password = hash;
    if (creds.username && creds.password){
        users.add(creds)
            .then(newUser => {
            res.status(201).json(newUser);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    } else {
        res.status(400).json({ errorMessage: 'username and password are required'})
    }
    
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