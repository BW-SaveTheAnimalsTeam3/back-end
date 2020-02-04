const bcrypt = require('bcryptjs')

const router = require('express').Router()

const db = require('../data/dbConfig.js')

const users = require('./usersModel')

router.post('/', (req, res)) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    db.addUser(user)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(error => {
            res.status(500).json(error);
        })
}

module.exports = router;