const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('./usersModel.js');
const router = express.Router();



router.post('/register', (req, res) => {
    const creds = req.body;

    const hash = bcrypt.hashSync(creds.password, 12);
    creds.password = hash;
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

router.post('/register/organizations', (req, res) => {
    const orgCreds = req.body;

    if (orgCreds.org_name && orgCreds.user_id){
        users.addOrg(orgCreds)
            .then(newOrg => {
                const token = generateToken(newOrg);

                res.status(201).json({ token, org_id: newOrg});
            })
            .catch(error => {
                res.status(500).json(error);
            })
    } else {
        res.status(400).json({errorMessage: 'organization name and user_id are required'})
    }
})

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    users.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user.id)

                res.status(200).json({message: `Welcome ${user.username}!`, token, id: user.id });
            } else {
                res.status(401).json({message: 'Invalid Credentials'})
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

function generateToken(id){
    const payload = {
        subject: id,
    };
    const secret = 'Secret sauce';
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options)
}

router.get('/', (req, res) => {
    users.findAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get users'})
        })
})

module.exports = router;